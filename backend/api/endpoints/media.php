<?php
require_once '../classes/Auth.php';
require_once '../classes/MediaManager.php';

$auth = new Auth();
$mediaManager = new MediaManager();

// Check authentication for write operations
if (in_array($method, ['POST', 'PUT', 'DELETE']) && !$auth->hasRole('editor')) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

switch ($method) {
    case 'GET':
        if ($action === 'stats') {
            $stats = $mediaManager->getMediaStats();
            echo json_encode(['stats' => $stats]);
            
        } elseif (!empty($action)) {
            $media = $mediaManager->getMediaById($action);
            if ($media) {
                echo json_encode(['media' => $media]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Media not found']);
            }
        } else {
            $filters = [];
            if (!empty($_GET['file_type'])) {
                $filters['file_type'] = $_GET['file_type'];
            }
            if (!empty($_GET['search'])) {
                $filters['search'] = $_GET['search'];
            }
            
            $media = $mediaManager->getAllMedia($filters);
            echo json_encode(['media' => $media]);
        }
        break;
        
    case 'POST':
        if ($action === 'upload') {
            if (empty($_FILES['file'])) {
                http_response_code(400);
                echo json_encode(['error' => 'No file uploaded']);
                exit;
            }
            
            $alt_text = $_POST['alt_text'] ?? '';
            $caption = $_POST['caption'] ?? '';
            
            $result = $mediaManager->uploadFile($_FILES['file'], $alt_text, $caption);
            
            if ($result['success']) {
                echo json_encode($result);
            } else {
                http_response_code(400);
                echo json_encode($result);
            }
        }
        break;
        
    case 'PUT':
        if (empty($action)) {
            http_response_code(400);
            echo json_encode(['error' => 'Media ID required']);
            exit;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        $result = $mediaManager->updateMedia($action, $input);
        
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
            echo json_encode(['error' => 'Media ID required']);
            exit;
        }
        
        $result = $mediaManager->deleteMedia($action);
        
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