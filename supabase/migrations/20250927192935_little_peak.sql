-- Schema Updates for Services Slider and Landing Page Background
-- Add these columns to existing tables

-- Update services table to support slider functionality
ALTER TABLE services 
ADD COLUMN icon_image INT NULL AFTER icon,
ADD COLUMN service_link VARCHAR(500) NULL AFTER icon_image,
ADD FOREIGN KEY (icon_image) REFERENCES media(id) ON DELETE SET NULL;

-- Add landing page settings to site_settings if not exists
INSERT IGNORE INTO site_settings (setting_key, setting_value, setting_type, category, description) VALUES 
('landing_background_image', '', 'text', 'landing', 'Background image for landing page hero section'),
('landing_overlay_opacity', '50', 'number', 'landing', 'White overlay opacity percentage (0-100)'),
('intro_video_url', '', 'text', 'landing', 'URL for the intro video (YouTube, Vimeo, or direct link)'),
('show_intro_button', '1', 'boolean', 'landing', 'Show or hide the Watch My Intro button');

-- Insert default services if table is empty
INSERT IGNORE INTO services (id, title, slug, description, icon, service_link, is_active, sort_order) VALUES 
(1, 'Logo Design', 'logo-design', 'Professional logos that make your brand unforgettable', '🎨', '/services#logo', 1, 1),
(2, 'YouTube Thumbnails', 'youtube-thumbnails', 'Eye-catching thumbnails that boost your click-through rates', '📺', '/services#thumbnails', 1, 2),
(3, 'Video Editing', 'video-editing', 'Professional video editing that keeps viewers engaged', '🎬', '/services#video', 1, 3),
(4, 'YouTube Channel Setup', 'youtube-setup', 'Complete channel branding and optimization', '🚀', '/services#youtube-branding', 1, 4),
(5, 'Complete Branding', 'complete-branding', 'Full brand identity packages for businesses', '✨', '/services#branding', 1, 5);