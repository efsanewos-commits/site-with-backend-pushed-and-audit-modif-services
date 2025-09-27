<?php
require_once 'config/database.php';

class SettingsManager {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function getAllSettings($category = null) {
        try {
            $where_clause = $category ? 'WHERE category = :category' : '';
            
            $query = "SELECT * FROM site_settings {$where_clause} ORDER BY category, setting_key";
            $stmt = $this->conn->prepare($query);
            
            if ($category) {
                $stmt->bindParam(':category', $category);
            }
            
            $stmt->execute();
            $settings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Convert to key-value pairs
            $result = [];
            foreach ($settings as $setting) {
                $result[$setting['setting_key']] = [
                    'value' => $setting['setting_value'],
                    'type' => $setting['setting_type'],
                    'category' => $setting['category'],
                    'description' => $setting['description']
                ];
            }
            
            return $result;
            
        } catch (Exception $e) {
            return [];
        }
    }
    
    public function getSetting($key) {
        try {
            $query = "SELECT setting_value FROM site_settings WHERE setting_key = :key";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':key', $key);
            $stmt->execute();
            
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result ? $result['setting_value'] : null;
            
        } catch (Exception $e) {
            return null;
        }
    }
    
    public function updateSetting($key, $value) {
        try {
            $query = "UPDATE site_settings SET 
                     setting_value = :value, 
                     updated_by = :updated_by 
                     WHERE setting_key = :key";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':key', $key);
            $stmt->bindParam(':value', $value);
            $stmt->bindParam(':updated_by', $_SESSION['user_id'] ?? null);
            
            $stmt->execute();
            
            return ['success' => true];
            
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    public function createSetting($key, $value, $type = 'text', $category = 'general', $description = '') {
        try {
            $query = "INSERT INTO site_settings 
                     (setting_key, setting_value, setting_type, category, description, updated_by) 
                     VALUES 
                     (:key, :value, :type, :category, :description, :updated_by)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':key', $key);
            $stmt->bindParam(':value', $value);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':category', $category);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':updated_by', $_SESSION['user_id'] ?? null);
            
            $stmt->execute();
            
            return ['success' => true];
            
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    public function deleteSetting($key) {
        try {
            $query = "DELETE FROM site_settings WHERE setting_key = :key";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':key', $key);
            $stmt->execute();
            
            return ['success' => true];
            
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    public function updateMultipleSettings($settings) {
        try {
            $this->conn->beginTransaction();
            
            foreach ($settings as $key => $value) {
                // Check if setting exists, if not create it
                $existing = $this->getSetting($key);
                if ($existing === null) {
                    $this->createSetting($key, $value, 'text', 'general', '');
                } else {
                    $this->updateSetting($key, $value);
                }
            }
            
            $this->conn->commit();
            
            return ['success' => true];
            
        } catch (Exception $e) {
            $this->conn->rollBack();
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    public function getSettingsByCategory() {
        try {
            $query = "SELECT * FROM site_settings ORDER BY category, setting_key";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $settings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $result = [];
            foreach ($settings as $setting) {
                $result[$setting['category']][$setting['setting_key']] = [
                    'value' => $setting['setting_value'],
                    'type' => $setting['setting_type'],
                    'description' => $setting['description']
                ];
            }
            
            return $result;
            
        } catch (Exception $e) {
            return [];
        }
    }
    
    public function getIntegrationSettings() {
        return $this->getAllSettings('integrations');
    }
    
    public function getLandingPageSettings() {
        return $this->getAllSettings('landing');
    }
    
    public function updateLandingPageSettings($data) {
        $landing_keys = [
            'landing_background_image',
            'landing_overlay_opacity',
            'intro_video_url',
            'show_intro_button'
        ];
        
        $settings_to_update = [];
        foreach ($landing_keys as $key) {
            if (isset($data[$key])) {
                $settings_to_update[$key] = $data[$key];
            }
        }
        
        return $this->updateMultipleSettings($settings_to_update);
    }
    
    public function updateIntegrationSettings($data) {
        $integration_keys = [
            'google_analytics_id',
            'meta_pixel_id',
            'calendly_url',
            'whatsapp_number',
            'tawk_to_id',
            'crisp_website_id'
        ];
        
        $settings_to_update = [];
        foreach ($integration_keys as $key) {
            if (isset($data[$key])) {
                $settings_to_update[$key] = $data[$key];
            }
        }
        
        return $this->updateMultipleSettings($settings_to_update);
    }
}
?>