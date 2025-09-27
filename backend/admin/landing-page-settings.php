<?php
require_once '../config/config.php';
require_once '../classes/Auth.php';
require_once '../classes/SettingsManager.php';

$auth = new Auth();

// Check if user is logged in and has editor role
if (!$auth->isLoggedIn() || !$auth->hasRole('editor')) {
    header('Location: login.php');
    exit;
}

$settingsManager = new SettingsManager();
$landingSettings = $settingsManager->getLandingPageSettings();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page Settings - Adil GFX Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Landing Page Settings</h1>
            <p class="text-gray-600 mt-2">Customize your homepage hero section background and appearance</p>
        </div>

        <div class="bg-white rounded-lg shadow">
            <div class="p-6">
                <form id="landing-settings-form">
                    <!-- Background Image Section -->
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Background Image</h3>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Upload Background Image</label>
                                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                    <input type="file" id="background-upload" accept="image/*" class="hidden">
                                    <button type="button" onclick="document.getElementById('background-upload').click()" 
                                            class="text-blue-600 hover:text-blue-800 transition-colors">
                                        <i class="fas fa-upload text-2xl mb-2"></i>
                                        <p class="font-medium">Upload New Background</p>
                                    </button>
                                    <p class="text-xs text-gray-500 mt-2">Recommended: 1920x1080px or larger<br>Formats: JPG, PNG, WebP</p>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Current Background</label>
                                <div id="current-background-preview" class="border border-gray-300 rounded-lg p-4 min-h-[200px] flex items-center justify-center bg-gray-50">
                                    <?php if (!empty($landingSettings['landing_background_image']['value'])): ?>
                                        <img src="../<?php echo $landingSettings['landing_background_image']['value']; ?>" 
                                             class="max-w-full max-h-48 object-cover rounded" 
                                             alt="Current background">
                                    <?php else: ?>
                                        <div class="text-center text-gray-500">
                                            <i class="fas fa-image text-3xl mb-2"></i>
                                            <p>No background image set</p>
                                            <p class="text-xs">Default white background will be used</p>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                
                                <?php if (!empty($landingSettings['landing_background_image']['value'])): ?>
                                <button type="button" onclick="removeBackground()" 
                                        class="mt-2 text-red-600 hover:text-red-800 text-sm">
                                    <i class="fas fa-trash mr-1"></i>Remove Background
                                </button>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Overlay Settings -->
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Overlay Settings</h3>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                White Overlay Opacity: <span id="opacity-value"><?php echo $landingSettings['landing_overlay_opacity']['value'] ?? 50; ?></span>%
                            </label>
                            <input type="range" id="overlay-opacity" name="overlay_opacity" 
                                   min="0" max="100" value="<?php echo $landingSettings['landing_overlay_opacity']['value'] ?? 50; ?>" 
                                   class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                   oninput="updateOpacityPreview(this.value)">
                            <div class="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0% (Full image visible)</span>
                                <span>50% (Balanced)</span>
                                <span>100% (White background)</span>
                            </div>
                        </div>
                        
                        <!-- Live preview -->
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Live Preview</label>
                            <div id="overlay-preview" class="w-full h-32 rounded-lg border border-gray-300 relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                <div id="overlay-layer" class="absolute inset-0 bg-white" 
                                     style="opacity: <?php echo ($landingSettings['landing_overlay_opacity']['value'] ?? 50) / 100; ?>"></div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-gray-800 font-semibold">Sample Content</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Intro Video Settings -->
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Intro Video Settings</h3>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Intro Video URL</label>
                                <input type="url" id="intro-video-url" name="intro_video_url" 
                                       value="<?php echo $landingSettings['intro_video_url']['value'] ?? ''; ?>"
                                       placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                                <p class="text-xs text-gray-500 mt-1">YouTube, Vimeo, or direct video file URL</p>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Button Settings</label>
                                <div class="flex items-center">
                                    <input type="checkbox" id="show-intro-button" name="show_intro_button" 
                                           <?php echo ($landingSettings['show_intro_button']['value'] ?? '1') == '1' ? 'checked' : ''; ?>
                                           class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded">
                                    <label for="show-intro-button" class="ml-2 block text-sm text-gray-900">
                                        Show "Watch My Intro" button
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex justify-end">
                        <button type="submit" 
                                class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                            <i class="fas fa-save mr-2"></i>Save Landing Page Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        function updateOpacityPreview(value) {
            document.getElementById('opacity-value').textContent = value;
            document.getElementById('overlay-layer').style.opacity = value / 100;
        }

        function removeBackground() {
            if (confirm('Are you sure you want to remove the background image?')) {
                fetch('../api/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        landing_background_image: ''
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        location.reload();
                    }
                });
            }
        }

        // Handle background image upload
        document.getElementById('background-upload').addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('alt_text', 'Landing page background image');
            
            try {
                const response = await fetch('../api/media/upload', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Update the setting
                    await fetch('../api/settings', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            landing_background_image: result.file_path
                        })
                    });
                    
                    location.reload();
                } else {
                    alert('Error uploading image: ' + result.message);
                }
            } catch (error) {
                console.error('Error uploading background:', error);
                alert('Error uploading background image');
            }
        });

        // Handle form submission
        document.getElementById('landing-settings-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const settings = {
                landing_overlay_opacity: formData.get('overlay_opacity'),
                intro_video_url: formData.get('intro_video_url'),
                show_intro_button: formData.get('show_intro_button') ? '1' : '0'
            };
            
            try {
                const response = await fetch('../api/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(settings)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('Settings saved successfully!');
                } else {
                    alert('Error saving settings: ' + result.message);
                }
            } catch (error) {
                console.error('Error saving settings:', error);
                alert('Error saving settings');
            }
        });
    </script>
</body>
</html>