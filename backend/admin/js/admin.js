// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentSection = 'dashboard';
        this.apiBase = '../api';
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadDashboard();
    }
    
    bindEvents() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('href').substring(1);
                this.navigateToSection(section);
            });
        });
    }
    
    navigateToSection(section) {
        // Update active link
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[href="#${section}"]`).classList.add('active');
        
        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            pages: 'Pages Management',
            portfolio: 'Portfolio Management',
            services: 'Services Management',
            blog: 'Blog Management',
            testimonials: 'Testimonials Management',
            forms: 'Forms & Leads',
            media: 'Media Library',
            settings: 'Settings',
            users: 'User Management'
        };
        
        document.getElementById('page-title').textContent = titles[section] || section;
        
        // Load section content
        this.currentSection = section;
        this.loadSectionContent(section);
    }
    
    async loadSectionContent(section) {
        const contentArea = document.getElementById('dynamic-content');
        const dashboardContent = document.getElementById('dashboard-content');
        
        if (section === 'dashboard') {
            dashboardContent.style.display = 'block';
            contentArea.style.display = 'none';
            this.loadDashboard();
            return;
        }
        
        dashboardContent.style.display = 'none';
        contentArea.style.display = 'block';
        
        try {
            switch (section) {
                case 'pages':
                    await this.loadPagesSection();
                    break;
                case 'portfolio':
                    await this.loadPortfolioSection();
                    break;
                case 'services':
                    await this.loadServicesSection();
                    break;
                case 'blog':
                    await this.loadBlogSection();
                    break;
                case 'testimonials':
                    await this.loadTestimonialsSection();
                    break;
                case 'forms':
                    await this.loadFormsSection();
                    break;
                case 'media':
                    await this.loadMediaSection();
                    break;
                case 'settings':
                    await this.loadSettingsSection();
                    break;
                case 'users':
                    await this.loadUsersSection();
                    break;
                default:
                    contentArea.innerHTML = '<p class="text-gray-600">Section not implemented yet.</p>';
            }
        } catch (error) {
            console.error('Error loading section:', error);
            contentArea.innerHTML = '<p class="text-red-600">Error loading content. Please try again.</p>';
        }
    }
    
    async loadDashboard() {
        try {
            // Load form stats
            const formsResponse = await fetch(`${this.apiBase}/forms/stats`);
            if (formsResponse.ok) {
                const formsData = await formsResponse.json();
                document.getElementById('total-submissions').textContent = formsData.stats.total_submissions || 0;
            }
            
            // Load portfolio stats
            const portfolioResponse = await fetch(`${this.apiBase}/portfolio`);
            if (portfolioResponse.ok) {
                const portfolioData = await portfolioResponse.json();
                document.getElementById('total-projects').textContent = portfolioData.projects.length || 0;
            }
            
            // Load blog stats
            const blogResponse = await fetch(`${this.apiBase}/blog`);
            if (blogResponse.ok) {
                const blogData = await blogResponse.json();
                document.getElementById('total-posts').textContent = blogData.posts.length || 0;
            }
            
            // Load recent activity
            this.loadRecentActivity();
            
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    }
    
    async loadRecentActivity() {
        try {
            const response = await fetch(`${this.apiBase}/forms?limit=5`);
            if (response.ok) {
                const data = await response.json();
                const activityContainer = document.getElementById('recent-activity');
                
                if (data.submissions && data.submissions.length > 0) {
                    activityContainer.innerHTML = data.submissions.map(submission => `
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p class="font-medium text-gray-800">New ${submission.form_type} submission</p>
                                <p class="text-sm text-gray-600">${submission.name || 'Anonymous'} - ${submission.email || 'No email'}</p>
                            </div>
                            <span class="text-xs text-gray-500">${new Date(submission.created_at).toLocaleDateString()}</span>
                        </div>
                    `).join('');
                } else {
                    activityContainer.innerHTML = '<p class="text-gray-600">No recent activity</p>';
                }
            }
        } catch (error) {
            console.error('Error loading recent activity:', error);
        }
    }
    
    async loadPagesSection() {
        const contentArea = document.getElementById('dynamic-content');
        
        try {
            const response = await fetch(`${this.apiBase}/pages`);
            const data = await response.json();
            
            contentArea.innerHTML = `
                <div class="bg-white rounded-lg shadow">
                    <div class="p-6 border-b flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-800">Pages Management</h3>
                        <button onclick="adminPanel.showCreatePageModal()" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            <i class="fas fa-plus mr-2"></i>Add New Page
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${data.pages.map(page => `
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">${page.title}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-500">/${page.slug}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.is_published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                                ${page.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${new Date(page.updated_at).toLocaleDateString()}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button onclick="adminPanel.editPage(${page.id})" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                            <button onclick="adminPanel.deletePage(${page.id})" class="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } catch (error) {
            contentArea.innerHTML = '<p class="text-red-600">Error loading pages. Please try again.</p>';
        }
    }
    
    async loadFormsSection() {
        const contentArea = document.getElementById('dynamic-content');
        
        try {
            const response = await fetch(`${this.apiBase}/forms`);
            const data = await response.json();
            
            contentArea.innerHTML = `
                <div class="bg-white rounded-lg shadow">
                    <div class="p-6 border-b flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-800">Form Submissions & Leads</h3>
                        <div class="flex space-x-2">
                            <select id="form-type-filter" class="border border-gray-300 rounded-md px-3 py-2">
                                <option value="">All Forms</option>
                                <option value="contact">Contact</option>
                                <option value="newsletter">Newsletter</option>
                                <option value="quote">Quote Request</option>
                                <option value="consultation">Consultation</option>
                            </select>
                            <button onclick="adminPanel.exportForms()" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                <i class="fas fa-download mr-2"></i>Export CSV
                            </button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${data.submissions.map(submission => `
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                ${submission.form_type}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">${submission.name || 'N/A'}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-500">${submission.email || 'N/A'}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getStatusColor(submission.status)}">
                                                ${submission.status}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${new Date(submission.created_at).toLocaleDateString()}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button onclick="adminPanel.viewSubmission(${submission.id})" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                                            <button onclick="adminPanel.updateSubmissionStatus(${submission.id}, 'read')" class="text-green-600 hover:text-green-900">Mark Read</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } catch (error) {
            contentArea.innerHTML = '<p class="text-red-600">Error loading forms. Please try again.</p>';
        }
    }
    
    getStatusColor(status) {
        const colors = {
            'new': 'bg-yellow-100 text-yellow-800',
            'read': 'bg-blue-100 text-blue-800',
            'replied': 'bg-green-100 text-green-800',
            'archived': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    }
    
    async exportForms() {
        try {
            const formType = document.getElementById('form-type-filter').value;
            const filters = formType ? { form_type: formType } : {};
            
            const response = await fetch(`${this.apiBase}/forms/export`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filters })
            });
            
            if (response.ok) {
                const data = await response.json();
                // Create download link
                const link = document.createElement('a');
                link.href = `../exports/${data.filename}`;
                link.download = data.filename;
                link.click();
            }
        } catch (error) {
            console.error('Error exporting forms:', error);
            alert('Error exporting forms. Please try again.');
        }
    }
    
    async updateSubmissionStatus(id, status) {
        try {
            const response = await fetch(`${this.apiBase}/forms/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status })
            });
            
            if (response.ok) {
                this.loadFormsSection(); // Reload the forms section
            }
        } catch (error) {
            console.error('Error updating submission status:', error);
        }
    }
    
    // Placeholder methods for other sections
    async loadPortfolioSection() {
        document.getElementById('dynamic-content').innerHTML = '<p class="text-gray-600">Portfolio management coming soon...</p>';
    }
    
    async loadServicesSection() {
        const contentArea = document.getElementById('dynamic-content');
        
        try {
            const response = await fetch(`${this.apiBase}/services`);
            const data = await response.json();
            
            contentArea.innerHTML = `
                <div class="bg-white rounded-lg shadow">
                    <div class="p-6 border-b flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-800">Services Management</h3>
                        <button onclick="adminPanel.showCreateServiceModal()" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            <i class="fas fa-plus mr-2"></i>Add New Service
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${data.services.map(service => `
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <input type="number" value="${service.sort_order}" 
                                                   onchange="adminPanel.updateServiceOrder(${service.id}, this.value)"
                                                   class="w-16 px-2 py-1 border border-gray-300 rounded text-sm">
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                ${service.icon_image_path ? 
                                                    `<img src="../${service.icon_image_path}" class="w-8 h-8 rounded mr-3" alt="${service.icon_image_alt || service.title}">` :
                                                    `<div class="w-8 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center text-sm">${service.icon || '📋'}</div>`
                                                }
                                                <div class="text-sm font-medium text-gray-900">${service.title}</div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="text-sm text-gray-500 max-w-xs truncate">${service.description || 'No description'}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                                ${service.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button onclick="adminPanel.editService(${service.id})" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                            <button onclick="adminPanel.deleteService(${service.id})" class="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Service Creation Modal -->
                <div id="service-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
                    <div class="flex items-center justify-center min-h-screen p-4">
                        <div class="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 class="text-lg font-semibold mb-4">Add New Service</h3>
                            <form id="service-form">
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input type="text" name="title" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea name="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                                        <input type="text" name="icon" placeholder="🎨" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Service Link</label>
                                        <input type="url" name="service_link" placeholder="/services#logo" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                                        <input type="number" name="sort_order" value="0" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    </div>
                                </div>
                                <div class="flex justify-end space-x-3 mt-6">
                                    <button type="button" onclick="adminPanel.closeServiceModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                                    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Create Service</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            // Bind form submission
            document.getElementById('service-form').addEventListener('submit', this.handleServiceSubmit.bind(this));
            
        } catch (error) {
            contentArea.innerHTML = '<p class="text-red-600">Error loading services. Please try again.</p>';
        }
    }
    
    showCreateServiceModal() {
        document.getElementById('service-modal').classList.remove('hidden');
    }
    
    closeServiceModal() {
        document.getElementById('service-modal').classList.add('hidden');
        document.getElementById('service-form').reset();
    }
    
    async handleServiceSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const serviceData = {
            title: formData.get('title'),
            slug: formData.get('title').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            description: formData.get('description'),
            icon: formData.get('icon'),
            service_link: formData.get('service_link'),
            sort_order: parseInt(formData.get('sort_order')),
            is_active: 1
        };
        
        try {
            const response = await fetch(`${this.apiBase}/services/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData)
            });
            
            if (response.ok) {
                this.closeServiceModal();
                this.loadServicesSection(); // Reload the services section
            } else {
                alert('Error creating service. Please try again.');
            }
        } catch (error) {
            console.error('Error creating service:', error);
            alert('Error creating service. Please try again.');
        }
    }
    
    async updateServiceOrder(serviceId, newOrder) {
        try {
            const response = await fetch(`${this.apiBase}/services/${serviceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sort_order: parseInt(newOrder) })
            });
            
            if (response.ok) {
                // Optionally reload the section to show updated order
                setTimeout(() => this.loadServicesSection(), 500);
            }
        } catch (error) {
            console.error('Error updating service order:', error);
        }
    }
    
    async deleteService(serviceId) {
        if (confirm('Are you sure you want to delete this service?')) {
            try {
                const response = await fetch(`${this.apiBase}/services/${serviceId}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    this.loadServicesSection(); // Reload the services section
                } else {
                    alert('Error deleting service. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('Error deleting service. Please try again.');
            }
        }
    }
    
    async loadBlogSection() {
        document.getElementById('dynamic-content').innerHTML = '<p class="text-gray-600">Blog management coming soon...</p>';
    }
    
    async loadTestimonialsSection() {
        document.getElementById('dynamic-content').innerHTML = '<p class="text-gray-600">Testimonials management coming soon...</p>';
    }
    
    async loadMediaSection() {
        document.getElementById('dynamic-content').innerHTML = '<p class="text-gray-600">Media library coming soon...</p>';
    }
    
    async loadSettingsSection() {
        const contentArea = document.getElementById('dynamic-content');
        
        try {
            const response = await fetch(`${this.apiBase}/settings`);
            const data = await response.json();
            
            contentArea.innerHTML = `
                <div class="space-y-6">
                    <!-- Landing Page Settings -->
                    <div class="bg-white rounded-lg shadow">
                        <div class="p-6 border-b">
                            <h3 class="text-lg font-semibold text-gray-800">Landing Page Settings</h3>
                        </div>
                        <div class="p-6">
                            <form id="landing-settings-form">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <input type="file" id="background-upload" accept="image/*" class="hidden">
                                            <button type="button" onclick="document.getElementById('background-upload').click()" 
                                                    class="text-blue-600 hover:text-blue-800">
                                                <i class="fas fa-upload mr-2"></i>Upload Background Image
                                            </button>
                                            <p class="text-xs text-gray-500 mt-2">Recommended: 1920x1080px or larger</p>
                                        </div>
                                        <div id="current-background" class="mt-2"></div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            White Overlay Opacity: <span id="opacity-value">50</span>%
                                        </label>
                                        <input type="range" name="overlay_opacity" min="0" max="100" value="50" 
                                               class="w-full" oninput="document.getElementById('opacity-value').textContent = this.value">
                                        <p class="text-xs text-gray-500 mt-1">0% = No overlay (full image), 100% = Full white background</p>
                                    </div>
                                </div>
                                <div class="mt-6">
                                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                        Save Landing Page Settings
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <!-- General Site Settings -->
                    <div class="bg-white rounded-lg shadow">
                        <div class="p-6 border-b">
                            <h3 class="text-lg font-semibold text-gray-800">General Settings</h3>
                        </div>
                        <div class="p-6">
                            <form id="general-settings-form">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                                        <input type="text" name="site_title" value="${data.settings?.site_title?.value || ''}" 
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                                        <input type="email" name="contact_email" value="${data.settings?.contact_email?.value || ''}" 
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                                        <input type="text" name="whatsapp_number" value="${data.settings?.whatsapp_number?.value || ''}" 
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Calendly URL</label>
                                        <input type="url" name="calendly_url" value="${data.settings?.calendly_url?.value || ''}" 
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    </div>
                                </div>
                                <div class="mt-6">
                                    <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                        Save General Settings
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            // Load current background image
            this.loadCurrentBackground();
            
            // Bind form submissions
            document.getElementById('landing-settings-form').addEventListener('submit', this.handleLandingSettingsSubmit.bind(this));
            document.getElementById('general-settings-form').addEventListener('submit', this.handleGeneralSettingsSubmit.bind(this));
            document.getElementById('background-upload').addEventListener('change', this.handleBackgroundUpload.bind(this));
            
        } catch (error) {
            contentArea.innerHTML = '<p class="text-red-600">Error loading settings. Please try again.</p>';
        }
    }
    
    async loadCurrentBackground() {
        try {
            const response = await fetch(`${this.apiBase}/settings`);
            const data = await response.json();
            
            const backgroundContainer = document.getElementById('current-background');
            const backgroundImage = data.settings?.landing_background_image?.value;
            
            if (backgroundImage) {
                backgroundContainer.innerHTML = `
                    <div class="mt-2 p-2 border border-gray-200 rounded">
                        <img src="../${backgroundImage}" class="w-full h-20 object-cover rounded" alt="Current background">
                        <p class="text-xs text-gray-500 mt-1">Current background image</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading current background:', error);
        }
    }
    
    async handleBackgroundUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('alt_text', 'Landing page background image');
        
        try {
            const response = await fetch(`${this.apiBase}/media/upload`, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                
                // Update the setting
                await fetch(`${this.apiBase}/settings`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        landing_background_image: result.file_path
                    })
                });
                
                this.loadCurrentBackground();
                alert('Background image uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading background:', error);
            alert('Error uploading background image. Please try again.');
        }
    }
    
    async handleLandingSettingsSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const settings = {
            landing_overlay_opacity: formData.get('overlay_opacity')
        };
        
        try {
            const response = await fetch(`${this.apiBase}/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings)
            });
            
            if (response.ok) {
                alert('Landing page settings saved successfully!');
            }
        } catch (error) {
            console.error('Error saving landing settings:', error);
            alert('Error saving settings. Please try again.');
        }
    }
    
    async handleGeneralSettingsSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const settings = {
            site_title: formData.get('site_title'),
            contact_email: formData.get('contact_email'),
            whatsapp_number: formData.get('whatsapp_number'),
            calendly_url: formData.get('calendly_url')
        };
        
        try {
            const response = await fetch(`${this.apiBase}/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings)
            });
            
            if (response.ok) {
                alert('General settings saved successfully!');
            }
        } catch (error) {
            console.error('Error saving general settings:', error);
            alert('Error saving settings. Please try again.');
        }
    }
    
    async loadUsersSection() {
        document.getElementById('dynamic-content').innerHTML = '<p class="text-gray-600">User management coming soon...</p>';
    }
}

// Initialize admin panel
const adminPanel = new AdminPanel();