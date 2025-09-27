<?php
require_once '../config/config.php';
require_once '../classes/Auth.php';
require_once '../classes/ServiceManager.php';

$auth = new Auth();

// Check if user is logged in and has editor role
if (!$auth->isLoggedIn() || !$auth->hasRole('editor')) {
    header('Location: login.php');
    exit;
}

$serviceManager = new ServiceManager();
$services = $serviceManager->getAllServices();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services Manager - Adil GFX Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
</head>
<body class="bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Services Manager</h1>
            <p class="text-gray-600 mt-2">Manage your homepage services slider</p>
        </div>

        <!-- Add Service Button -->
        <div class="mb-6">
            <button onclick="openAddServiceModal()" class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
                <i class="fas fa-plus mr-2"></i>Add New Service
            </button>
        </div>

        <!-- Services List -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Current Services</h2>
                <p class="text-sm text-gray-600">Drag to reorder services in the slider</p>
            </div>
            
            <div id="services-list" class="divide-y divide-gray-200">
                <?php foreach ($services as $service): ?>
                <div class="service-item p-6 hover:bg-gray-50 cursor-move" data-id="<?php echo $service['id']; ?>">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="drag-handle text-gray-400 hover:text-gray-600">
                                <i class="fas fa-grip-vertical"></i>
                            </div>
                            
                            <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                                <?php if ($service['icon_image_path']): ?>
                                    <img src="../<?php echo $service['icon_image_path']; ?>" 
                                         alt="<?php echo htmlspecialchars($service['title']); ?>"
                                         class="w-8 h-8 object-cover rounded">
                                <?php else: ?>
                                    <span class="text-xl"><?php echo $service['icon'] ?: '📋'; ?></span>
                                <?php endif; ?>
                            </div>
                            
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900"><?php echo htmlspecialchars($service['title']); ?></h3>
                                <p class="text-gray-600 text-sm"><?php echo htmlspecialchars($service['description']); ?></p>
                                <div class="flex items-center space-x-4 mt-2">
                                    <span class="text-xs text-gray-500">Order: <?php echo $service['sort_order']; ?></span>
                                    <?php if ($service['service_link']): ?>
                                        <a href="<?php echo htmlspecialchars($service['service_link']); ?>" 
                                           class="text-xs text-blue-600 hover:text-blue-800" target="_blank">
                                            <i class="fas fa-external-link-alt mr-1"></i>View Link
                                        </a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <span class="px-2 py-1 text-xs rounded-full <?php echo $service['is_active'] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'; ?>">
                                <?php echo $service['is_active'] ? 'Active' : 'Inactive'; ?>
                            </span>
                            
                            <button onclick="editService(<?php echo $service['id']; ?>)" 
                                    class="text-blue-600 hover:text-blue-800 p-2">
                                <i class="fas fa-edit"></i>
                            </button>
                            
                            <button onclick="deleteService(<?php echo $service['id']; ?>)" 
                                    class="text-red-600 hover:text-red-800 p-2">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Add/Edit Service Modal -->
    <div id="service-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
        <div class="flex items-center justify-center min-h-screen p-4">
            <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-gray-200">
                    <h3 id="modal-title" class="text-xl font-semibold text-gray-900">Add New Service</h3>
                </div>
                
                <form id="service-form" class="p-6">
                    <input type="hidden" id="service-id" name="service_id">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
                            <input type="text" id="service-title" name="title" required 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Service Link</label>
                            <input type="text" id="service-link" name="service_link" 
                                   placeholder="/services#logo or https://external-link.com"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea id="service-description" name="description" rows="3" 
                                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"></textarea>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label>
                            <input type="text" id="service-icon" name="icon" 
                                   placeholder="🎨 (or leave empty to use image)"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                            <input type="number" id="service-order" name="sort_order" value="0" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Icon Image (Optional)</label>
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <input type="file" id="icon-upload" accept="image/*" class="hidden">
                            <button type="button" onclick="document.getElementById('icon-upload').click()" 
                                    class="text-blue-600 hover:text-blue-800">
                                <i class="fas fa-upload mr-2"></i>Upload Icon Image
                            </button>
                            <p class="text-xs text-gray-500 mt-2">Recommended: 64x64px, PNG or JPG</p>
                        </div>
                        <div id="current-icon" class="mt-2"></div>
                    </div>
                    
                    <div class="flex items-center mt-6">
                        <input type="checkbox" id="service-active" name="is_active" checked 
                               class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded">
                        <label for="service-active" class="ml-2 block text-sm text-gray-900">
                            Active (show in slider)
                        </label>
                    </div>
                    
                    <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                        <button type="button" onclick="closeServiceModal()" 
                                class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" 
                                class="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors">
                            <span id="submit-text">Create Service</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        // Initialize sortable list
        const servicesList = document.getElementById('services-list');
        Sortable.create(servicesList, {
            handle: '.drag-handle',
            animation: 150,
            onEnd: function(evt) {
                updateServiceOrder();
            }
        });

        function openAddServiceModal() {
            document.getElementById('modal-title').textContent = 'Add New Service';
            document.getElementById('submit-text').textContent = 'Create Service';
            document.getElementById('service-form').reset();
            document.getElementById('service-id').value = '';
            document.getElementById('current-icon').innerHTML = '';
            document.getElementById('service-modal').classList.remove('hidden');
        }

        function closeServiceModal() {
            document.getElementById('service-modal').classList.add('hidden');
        }

        function editService(serviceId) {
            // Fetch service data and populate form
            fetch(`../api/services/${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.service) {
                        const service = data.service;
                        document.getElementById('modal-title').textContent = 'Edit Service';
                        document.getElementById('submit-text').textContent = 'Update Service';
                        document.getElementById('service-id').value = service.id;
                        document.getElementById('service-title').value = service.title;
                        document.getElementById('service-description').value = service.description || '';
                        document.getElementById('service-icon').value = service.icon || '';
                        document.getElementById('service-link').value = service.service_link || '';
                        document.getElementById('service-order').value = service.sort_order;
                        document.getElementById('service-active').checked = service.is_active;
                        
                        if (service.icon_image_path) {
                            document.getElementById('current-icon').innerHTML = `
                                <div class="mt-2 p-2 border border-gray-200 rounded">
                                    <img src="../${service.icon_image_path}" class="w-16 h-16 object-cover rounded mx-auto" alt="Current icon">
                                    <p class="text-xs text-gray-500 mt-1 text-center">Current icon</p>
                                </div>
                            `;
                        }
                        
                        document.getElementById('service-modal').classList.remove('hidden');
                    }
                })
                .catch(error => {
                    console.error('Error fetching service:', error);
                    alert('Error loading service data');
                });
        }

        function deleteService(serviceId) {
            if (confirm('Are you sure you want to delete this service?')) {
                fetch(`../api/services/${serviceId}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        location.reload();
                    } else {
                        alert('Error deleting service: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error deleting service:', error);
                    alert('Error deleting service');
                });
            }
        }

        function updateServiceOrder() {
            const serviceItems = document.querySelectorAll('.service-item');
            const updates = [];
            
            serviceItems.forEach((item, index) => {
                const serviceId = item.getAttribute('data-id');
                updates.push({
                    id: serviceId,
                    sort_order: index + 1
                });
            });
            
            // Update order in backend
            updates.forEach(update => {
                fetch(`../api/services/${update.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sort_order: update.sort_order })
                });
            });
        }

        // Handle form submission
        document.getElementById('service-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const serviceId = formData.get('service_id');
            
            // Handle icon upload if file selected
            const iconFile = document.getElementById('icon-upload').files[0];
            let iconImageId = null;
            
            if (iconFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', iconFile);
                uploadFormData.append('alt_text', `${formData.get('title')} service icon`);
                
                try {
                    const uploadResponse = await fetch('../api/media/upload', {
                        method: 'POST',
                        body: uploadFormData
                    });
                    const uploadResult = await uploadResponse.json();
                    if (uploadResult.success) {
                        iconImageId = uploadResult.id;
                    }
                } catch (error) {
                    console.error('Error uploading icon:', error);
                }
            }
            
            const serviceData = {
                title: formData.get('title'),
                slug: formData.get('title').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                description: formData.get('description'),
                icon: formData.get('icon'),
                icon_image: iconImageId,
                service_link: formData.get('service_link'),
                sort_order: parseInt(formData.get('sort_order')),
                is_active: formData.get('is_active') ? 1 : 0
            };
            
            const url = serviceId ? `../api/services/${serviceId}` : '../api/services/create';
            const method = serviceId ? 'PUT' : 'POST';
            
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(serviceData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    closeServiceModal();
                    location.reload();
                } else {
                    alert('Error saving service: ' + result.message);
                }
            } catch (error) {
                console.error('Error saving service:', error);
                alert('Error saving service');
            }
        });
    </script>
</body>
</html>