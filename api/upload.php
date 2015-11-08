<?php

require 'ImageResize.php';

header('Content-Type: text/plain; charset=utf-8');

try {

	if (!isset($_FILES['file']['error']) || is_array($_FILES['file']['error'])) {
		throw new RuntimeException('Invalid parameters.');
	}


	// Check the file size
	if ($_FILES['file']['size'] > 2097152) {
		throw new RuntimeException('Exceeded filesize limit');
	}


	// Check MIME type
	$finfo = new finfo(FILEINFO_MIME_TYPE);
	if (false === $ext = array_search(
		$finfo->file($_FILES['file']['tmp_name']),
		array(
			'jpg' => 'image/jpeg',
			'png' => 'image/png',
			'gif' => 'image/gif'
		), 
		true
	)) {
		throw new RuntimeException('Invalid file format');
	}


	// Name it uniquely
	$file_name = sha1_file($_FILES['file']['tmp_name']);
	if (!move_uploaded_file(
		$_FILES['file']['tmp_name'], 
		sprintf('../temp/%s.%s',
			$file_name,
			$ext
		))
	) {
		throw new RuntimeException('Faild to move uploaded image');
	}

	$uploadFileSrc = '../temp/'.$file_name.'.'.$ext;
	$fileDest = 'data/uploads/'.$file_name.'.'.$ext;

	$image = new ImageResize($uploadFileSrc);
	$image->resize(64, 64);
	if (!$image->save('../' . $fileDest)) {
		throw new RuntimeException('Faild to resize the image');
	} else {
		echo '{"success": {"text": "' . $fileDest . '" }}';
	}

	
} catch(RuntimeException $e) {
	echo '{"error": {"text":' . $e->getMessage() . '}}';
}