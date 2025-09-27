<?php
require_once '../classes/Auth.php';
require_once '../classes/SettingsManager.php';

$auth = new Auth();
$settingsManager = new SettingsManager();

// Check authentication for write operations
if (in_array($method, ['POST', 'PUT', 'DELETE']) && !$auth->hasRole('editor')) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

switch ($method) {
    case 'GET':
        if (!empty($action)) {
            $setting = $settingsManager->getSetting($action);
            if ($setting !== null) {
                echo json_encode(['setting' => $setting]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Setting not found']);
            }
        } else {
            $category = $_GET['category'] ?? null;
            $settings = $settingsManager->getAllSettings($category);
            echo json_encode(['settings' => $settings]);
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['key']) || !isset($input['value'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Key and value are required']);
            exit;
        }
        
        $result = $settingsManager->createSetting(
            $input['key'], 
            $input['value'], 
            $input['type'] ?? 'text',
            $input['category'] ?? 'general',
            $input['description'] ?? ''
        );
        
        if ($result['success']) {
            echo json_encode($result);
        } else {
            http_response_code(400);
            echo json_encode($result);
        }
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!empty($action)) {
            // Update single setting
            if (!isset($input['value'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Value is required']);
                exit;
            }
            
            $result = $settingsManager->updateSetting($action, $input['value']);
        } else {
            // Update multiple settings
            $result = $settingsManager->updateMultipleSettings($input);
        }
        
        if ($result['success']) {
            echo json_encode($result);
        } else {
            http_response_code(400);
            echo json_encode($result);
        }
        break;
        
    case 'DELETE':
        if (empty($action)) {
            http_response_code(400);
            echo json_encode(['error' => 'Setting key required']);
            exit;
        }
        
        $result = $settingsManager->deleteSetting($action);
        
        if ($result['success']) {
            echo json_encode($result);
        } else {
            http_response_code(400);
            echo json_encode($result);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>