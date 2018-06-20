<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$servername = "localhost";
$username = "id6053759_zst";
$password = "Abcd345h";
$dbname = "id6053759_flo";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$sSQL= 'SET CHARACTER SET utf8';
mysqli_query($conn, $sSQL);




function get_all_products($conn){

    $sql = 'select * from products ORDER BY id DESC';
    $result = $conn->query($sql);
    $data = [];
    while($row = $result->fetch_assoc()){
        array_push($data, $row);
    }

    $prodarr = (array)($data);

    $sql = 'select * from sub_categories';
    $result = $conn->query($sql);
    $data = [];
    while($row = $result->fetch_assoc()){
        array_push($data, $row);
    }

    $catarr = (array)($data);

    for($i = 0; $i < count($prodarr); $i++){
        for($q = 0; $q < count($catarr); $q++){
            if($prodarr[$i]['category'] == $catarr[$q]['id']){
                $prodarr[$i]['category_name'] = $catarr[$q]['title'];
                $prodarr[$i]['category_slag'] = $catarr[$q]['slag'];
            }
        }
    }
    return [
        "products" => $prodarr,
        "categories"=> $catarr
    ];
}
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

    }else if($_SERVER['REQUEST_METHOD'] == 'GET'){
        if(isset($_GET['common'])){
            if($_GET['common'] == 'locale'){
                if(file_exists('./admin_data/common.json')){
                    $file = fopen('./admin_data/common.json', 'r');
                    $data = json_decode(fread($file, filesize('./admin_data/common.json')));
                    fclose($file);
                    echo json_encode($data);
                }
            }
        }else{
            if(isset($_GET['categories'])){
                if($_GET['categories'] == 'list'){
                    $sql = 'select * from categories';
                    $result = $conn->query($sql);
                    $data = [];
                    while($row = $result->fetch_assoc()){
                        array_push($data, $row);
                    }
                    $categories = $data;

                    $sql = 'select * from sub_categories';
                    $result = $conn->query($sql);
                    $data = [];
                    while($row = $result->fetch_assoc()){
                        array_push($data, $row);
                    }
                    $sub_categories = $data;

                    $catarr = (array)($categories);
                    $subcatarr = (array)($sub_categories);

                    for($i = 0; $i < count($catarr); $i++){
                        for($q = 0; $q < count($subcatarr); $q++){
                            if($subcatarr[$q]['parent'] == $catarr[$i]['id']){
                                if(!isset($catarr[$i]['sub'])){
                                    $catarr[$i]['sub'] = [];
                                }
                                array_push($catarr[$i]['sub'], $subcatarr[$q]);
                            }
                        }
                    }

                    echo json_encode($catarr);
                }
            }else if(isset($_GET['slider'])){
                if($_GET['slider'] == 'slides'){
                    $sql = "select * from slider";
                    $result = $conn->query($sql);
                    $data = [];
                    while($row = $result->fetch_assoc()){
                        array_push($data, $row);
                    }
                    echo json_encode($data);
                }
            }else if(isset($_GET['products'])){

                if($_GET['products'] == 'catalog'){
                    $all_products = get_all_products($conn);
                    $prodarr = $all_products['products'];
                    $catarr = $all_products['categories'];

                    $data = [];
                    for($i = 0; $i < count($catarr); $i++){
                        $catalogarr = [
                            'title' => $catarr[$i]['title'],
                            'slag' => $catarr[$i]['slag'],
                            'data' => []
                        ];
                        for($q = 0; $q < count($prodarr); $q++){
                            if($prodarr[$q]['category'] == $catarr[$i]['id']){
                                array_push($catalogarr['data'], $prodarr[$q]);
                            }
                        }
                        array_push($data, $catalogarr);
                    }
                    echo json_encode($data);
                }else if($_GET['products'] == 'sales_real'){
                    $all_products = get_all_products($conn);
                    $prodarr = $all_products['products'];

                    $data = [];
                    for($i = 0; $i < count($prodarr); $i++){
                        if($prodarr[$i]['old_price'] > $prodarr[$i]['price']){
                            array_push($data, $prodarr[$i]);
                        }
                    }
                    echo json_encode($data);
                }else if($_GET['products'] == 'sales'){
                    $sql = 'select * from sales';
                    $result = $conn->query($sql);
                    $data = [];
                    while($row = $result->fetch_assoc()){
                        array_push($data, $row);
                    }
                    $salesarr = (array)($data);
                    $all_products = get_all_products($conn);
                    $prodarr = $all_products['products'];
                    $data = [];
                    for($i = 0; $i < count($salesarr); $i++){
                        for($q = 0; $q < count($prodarr); $q++){
                            if($salesarr[$i]['product_id'] == $prodarr[$q]['id']){
                                array_push($data, $prodarr[$q]);
                            }
                        }
                    }
                    echo json_encode($data);
                }else if($_GET['products'] == 'category'){
                    if(isset($_GET['category_slag'])){
                        $all_products = get_all_products($conn);
                        $prodarr = $all_products['products'];

                        $sql = 'select * from product_images';
                        $result = $conn->query($sql);
                        $data = [];
                        while($row = $result->fetch_assoc()){
                            array_push($data, $row);
                        }

                        $product_images = $data;

                        $data = [];

                        $slag = '/flowers/'.$_GET['category_slag'];

                        for($i = 0; $i < count($prodarr); $i++){
                            if($prodarr[$i]['category_slag'] == $slag){
                                array_push($data, $prodarr[$i]);
                            }
                        }

                        for($i = 0; $i < count($data); $i++){
                            if(!isset($data[$i]['images'])){
                                $data[$i]['images'] = [];
                            }
                            for($q = 0; $q < count($product_images); $q++){
                                if($product_images[$q]['product_id'] == $data[$i]['id']){
                                    array_push($data[$i]['images'], $product_images[$q]['image_url']);
                                }
                            }
                        }

                        echo json_encode($data);
                    }
                }
            }else if(isset($_GET['product'])){
                $sql = 'select * from products WHERE id ='.$_GET['product'];
                $result = $conn->query($sql);

                $data = [];

                while($row = $result->fetch_assoc()){
                    array_push($data, $row);
                }

                $prods = (array)($data);

                for($i = 0; $i < count($prods); $i++){
                    if($prods[$i]['category'] == 7){
                        $prods[$i]['hasCount'] = true;
                    }else{
                        $prods[$i]['hasCount'] = false;
                    }
                }

                $sql = 'select * from product_images where product_id='.$_GET['product'];
                $result = $conn->query($sql);
                $data = [];

                while($row = $result->fetch_assoc()){
                    array_push($data, $row);
                }



                if(count($prods) > 0){
                    $prods[0]['images'] = [];
                    for($i = 0; $i < count($data); $i++){
                        array_push($prods[0]['images'], $data[$i]['image_url']);
                    }
                }

                if(count($prods) > 0){
                    $all_products = get_all_products($conn);
                    $prodarr = $all_products['products'];
                    $catarr = $all_products['categories'];

                    $p = [];
                    for($i = 0; $i < count($prodarr); $i++){
                        if($prodarr[$i]['category'] == $prods[0]['category']){
                            array_push($p, $prodarr[$i]);
                        }
                    }
                    $prodarr = $p;

                    $c = [];
                    for($i = 0; $i < count($catarr); $i++){
                        if($catarr[$i]['id'] == $prods[0]['category']){
                            array_push($c, $catarr[$i]);
                        }
                    }
                    $catarr = $c;

                    $data = [];
                    for($i = 0; $i < count($catarr); $i++){
                        $catalogarr = [
                            'title' => $catarr[$i]['title'],
                            'slag' => $catarr[$i]['slag'],
                            'data' => []
                        ];
                        for($q = 0; $q < count($prodarr); $q++){
                            if($prodarr[$q]['category'] == $catarr[$i]['id']){
                                array_push($catalogarr['data'], $prodarr[$q]);
                            }
                        }
                        array_push($data, $catalogarr);
                    }
                    $prods[0]['collection']['items'] = $data;
                }


                echo json_encode($prods);
            }else if(isset($_GET['favourites'])){
                $ids = explode('_', $_GET['favourites']);
                $strdata = '';

                for($i = 0; $i < count($ids); $i++){
                    $strdata.='\''.$ids[$i].'\'';
                    if($i != count($ids) - 1){
                        $strdata.=',';
                    }
                }


                $data = [];
                $sql = 'select * from products WHERE id  IN('.$strdata.')';

                $result = $conn->query($sql);

                $data = [];

                while($row = $result->fetch_assoc()){
                    array_push($data, $row);
                }

                $prods = (array)($data);

                $sql = 'select * from product_images where product_id IN('.$strdata.')';
                $result = $conn->query($sql);
                $data = [];

                while($row = $result->fetch_assoc()){
                    array_push($data, $row);
                }

                if(count($prods) > 0){
                    $prods[0]['images'] = [];
                    for($i = 0; $i < count($data); $i++){
                        array_push($prods[0]['images'], $data[$i]['image_url']);
                    }
                }

                if(count($prods) > 0){
                    $all_products = get_all_products($conn);
                    $prodarr = $all_products['products'];
                    $catarr = $all_products['categories'];

                    $p = [];
                    for($i = 0; $i < count($prodarr); $i++){
                        if($prodarr[$i]['category'] == $prods[0]['category']){
                            array_push($p, $prodarr[$i]);
                        }
                    }
                    $prodarr = $p;

                    $c = [];
                    for($i = 0; $i < count($catarr); $i++){
                        if($catarr[$i]['id'] == $prods[0]['category']){
                            array_push($c, $catarr[$i]);
                        }
                    }
                    $catarr = $c;

                    $data = [];
                    for($i = 0; $i < count($catarr); $i++){
                        $catalogarr = [
                            'title' => $catarr[$i]['title'],
                            'slag' => $catarr[$i]['slag'],
                            'data' => []
                        ];
                        for($q = 0; $q < count($prodarr); $q++){
                            if($prodarr[$q]['category'] == $catarr[$i]['id']){
                                array_push($catalogarr['data'], $prodarr[$q]);
                            }
                        }
                        array_push($data, $catalogarr);
                    }
                    $prods[0]['collection']['items'] = $data;
                }


                echo json_encode($prods);
            }else if(isset($_GET['search'])){
                $all_products = get_all_products($conn)['products'];
                $products = [];

                $key = strtolower($_GET['search']);

                for($i = 0; $i < count($all_products); $i++){
                    if(strpos(strtolower($all_products[$i]['title']), $key) !== false || strpos(strtolower($all_products[$i]['description']), $key) !== false){
                        array_push($products, $all_products[$i]);
                    }
                }

                echo json_encode($products);
            }else if(isset($_GET['locale'])){
                switch($_GET['locale']){
                    case 'languages': {
                        echo json_encode(['en', 'ka', 'ru', 'fr', 'de']);
                        break;
                    }
                    case 'keywords': {
                        $sql = "select * from keywords";
                        $result = $conn->query($sql);
                        $languages = ['en', 'ka', 'ru', 'de', 'fr'];
                        $data = [];
                        foreach ($languages as $language) {
                            $data[$language] = [];
                        }
                        while($row = $result->fetch_assoc()){
                            foreach ($languages as $language) {
                                array_push($data[$language], $row[$language]);
                            }
                        }
                        if(!isset($_GET['reference']) && !isset($_GET['result'])){
                            echo json_encode($data);
                        }else if(isset($_GET['result'])){
                            echo json_encode($data[$_GET['result']]);
                        }else{
                            echo json_encode($data[$_GET['reference']]);
                        }
                        break;
                    }
                    case 'reference': {
                        $reference = 'en';
                        echo json_encode($reference);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }else if(isset($_GET['contact'])){
                if($_GET['contact'] == 'page'){
                    if(file_exists('./admin_data/contact.json')){
                        $file = fopen('./admin_data/contact.json', 'r');
                        $data = json_decode(fread($file, filesize('./admin_data/contact.json')));
                        fclose($file);
                        echo json_encode($data);
                    }
                }
            }else if(isset($_GET['conditions'])){
                if($_GET['conditions'] == 'page'){
                    if(file_exists('./admin_data/conditions.json')){
                        $file = fopen('./admin_data/conditions.json', 'r');
                        $data = json_decode(fread($file, filesize('./admin_data/conditions.json')));
                        fclose($file);
                        echo json_encode($data);
                    }
                }
            }else if(isset($_GET['footer'])){
                if($_GET['footer'] == 'data'){
                    $sql = 'select * from categories where slag != "/flowers"';
                    $result = $conn->query($sql);
                    $data = [];
                    while($row = $result->fetch_assoc()){
                        array_push($data, $row);
                    }

                    $data = (array)($data);
                    $navigation = $data;
                    $data = [
                      'navigation' => $navigation
                    ];

                    echo json_encode($data);
                }
            }else if(isset($_GET['subscribe'])){
                $sql = 'select id from subscribes where email = "'.$_GET['subscribe'].'"';
                $result = $conn->query($sql);
                $data = [];
                while($row = $result->fetch_assoc()){
                    array_push($data, $row);
                }

                if(count($data) == 0){
                    $sql = 'INSERT INTO subscribes (email) VALUES("'.$_GET['subscribe'].'")';
                    if($conn->query($sql) == TRUE){
                        echo json_encode(true);
                    }else{
                        echo json_encode(false);
                    }
                }else{
                    echo json_encode(false);
                }
            }
        }
    }
