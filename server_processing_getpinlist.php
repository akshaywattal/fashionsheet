<?php
 
// DB table to use
$table = 'stylepins';
 
// Table's primary key
$primaryKey = 'id';
 
// Array of database columns which should be read and sent back to UI.
$columns = array(
    array( 'db' => 'title', 'dt' => title ),
    array( 'db' => 'blurb', 'dt' => blurb ),
    array( 'db' => 'author',     'dt' => author ),
    array( 'db' => 'thumbnail_url', 'dt' => thumbnail_url ),
    array( 'db' => 'details_url', 'dt' => details_url)
    );

// Connection details for MySQL 
$sql_details = array(
    'user' => 'root',
    'pass' => 'password',
    'db'   => 'fashionsheet',
    'host' => '127.0.0.1'
);
 
require( 'ssp.class.php' );
 
// Get response back in JSON format
echo $_GET['callback'].'('.json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
).');';