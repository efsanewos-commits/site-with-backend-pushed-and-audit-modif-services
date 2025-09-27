<?php
require_once 'config/database.php';

class ServiceManager {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function getAllServices() {
        try {
            $query = "SELECT s.*, m.file_path as icon_image_path, m.alt_text as icon_image_alt
                     FROM services s 
                     LEFT JOIN media m ON s.icon_image = m.id 
                     WHERE s.is_active = 1 
                     ORDER BY s.sort_order, s.title";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Get packages for each service
            foreach ($services as &$service) {
                $service['packages'] = $this->getServicePackages($service['id']);
            }
            
            return $services;
            
        } catch (Exception $e) {
            return [];
        }
    }
    
    public function getServiceBySlug($slug) {
        try {
            $query = "SELECT * FROM services WHERE slug = :slug AND is_active = 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':slug', $slug);
            $stmt->execute();
            
            $service = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($service) {
                $service['packages'] = $this->getServicePackages($service['id']);
            }
            
            return $service;
            
        } catch (Exception $e) {
            return null;
        }
    }
    
    public function getServicePackages($service_id) {
        try {
            $query = "SELECT * FROM service_packages WHERE service_id = :service_id AND is_active = 1 ORDER BY sort_order, price";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':service_id', $service_id);
            $stmt->execute();
            
            $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Decode JSON features
            foreach ($packages as &$package) {
                $package['features'] = json_decode($package['features'], true) ?: [];
            }
            
            return $packages;
            
        } catch (Exception $e) {
            return [];
        }
    }
    
    public function createService($data) {
        try {
            $query = "INSERT INTO services (title, slug, description, icon, icon_image, service_link, is_active, sort_order) 
                     VALUES (:title, :slug, :description, :icon, :icon_image, :service_link, :is_active, :sort_order)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':slug', $data['slug']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':icon', $data['icon']);
            $stmt->bindParam(':icon_image', $data['icon_image']);
            $stmt->bindParam(':service_link', $data['service_link']);
            $stmt->bindParam(':is_active', $data['is_active']);
            $stmt->bindParam(':sort_order', $data['sort_order']);
            
            $stmt->execute();
            
            return ['success' => true, 'id' => $this->conn->lastInsertId()];
            
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    public function updateService($id, $data) {
        try {
            $query = "UPDATE services SET 
                     title = :title, slug = :slug, description = :description, 
                     icon = :icon, icon_image = :icon_image, service_link = :service_link, 
                     is_active = :is_active, sort_order = :sort_order 
                     WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':slug', $data['slug']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':icon', $data['icon']);
            $stmt->bindParam(':icon_image', $data['icon_image']);
            $stmt->bindParam(':service_link', $data['service_link']);
            $stmt->bindParam(':is_active', $data['is_active']);
            $stmt->bindParam(':sort_order', $data['sort_order']);
            
            $stmt->execute();
            
            return ['success' => true];
            
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    public function createPackage($data) {
        try {
            $query = "INSERT INTO service_packages 
                     (service_id, name, description, price, price_text, timeline, features, is_popular, is_active, sort_order) 
                     VALUES 
                     (:service_id, :name, :description, :price, :price_text, :timeline, :features, :is_popular, :is_active, :sort_order)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':service_id', $data['service_id']);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':price_text', $data['price_text']);
            $stmt->bindParam(':timeline', $data['timeline']);
            $stmt->bindParam(':features', json_encode($data['features']));
            $stmt->bindParam(':is_popular', $data['is_popular']);
            $stmt->bindParam(':is_active', $data['is_active']);
            $stmt->bindParam(':sort_order', $data['sort_order']);
            
            $stmt->execute();
            
            return ['success' => true, 'id' => $this->conn->lastInsertId()];
            
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    public function updatePackage($id, $data) {
        try {
            $query = "UPDATE service_packages SET 
                     service_id = :service_id, name = :name, description = :description, 
                     price = :price, price_text = :price_text, timeline = :timeline, 
                     features = :features, is_popular = :is_popular, is_active = :is_active, 
                     sort_order = :sort_order 
                     WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':service_id', $data['service_id']);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':price_text', $data['price_text']);
            $stmt->bindParam(':timeline', $data['timeline']);
            $stmt->bindParam(':features', json_encode($data['features']));
            $stmt->bindParam(':is_popular', $data['is_popular']);
            $stmt->bindParam(':is_active', $data['is_active']);
            $stmt->bindParam(':sort_order', $data['sort_order']);
            
            $stmt->execute();
            
            return ['success' => true];
            
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    public function deleteService($id) {
        try {
            $this->conn->beginTransaction();
            
            // Delete service packages
            $delete_packages = "DELETE FROM service_packages WHERE service_id = :id";
            $stmt = $this->conn->prepare($delete_packages);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            // Delete service
            $query = "DELETE FROM services WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            $this->conn->commit();
            
            return ['success' => true];
            
        } catch (Exception $e) {
            $this->conn->rollBack();
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    public function deletePackage($id) {
        try {
            $query = "DELETE FROM service_packages WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            return ['success' => true];
            
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
}
?>