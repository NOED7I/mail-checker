<?php
/**
 * Mailer Checker Server
 * @author  cloud@txthinking.com
 * @link    http://blog.txthinking.com
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html     GNU GPL v2
 * @version 1.3
 */
///////////////////////////////////////////////
$KEY = "47a7b49b6e621e5bf5f2439ef537c3ad";
///////////////////////////////////////////////
if(!empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['server']) && !empty($_POST['port'])){
	$username = goXor($KEY, $_POST['username']);
	$password = goXor($KEY, $_POST['password']);
	$server = goXor($KEY, $_POST['server']);
	$port = goXor($KEY, $_POST['port']);
	if($port == 993){
		$server = 'ssl://'.$server;
	}else{
		$server = 'tcp://'.$server;	
	}
}else{
	returnExit(1, "ERROR");
}

$tagInt = 0;
$GLOBALS['result'] = '';

//start request
$socket = @fsockopen($server, $port, $errno, $errstr, 3);
$socket || returnExit(2, "open socket error");
//CAPABILITY
$tag = 'TX'. ++$tagInt;
$in = "$tag CAPABILITY\r\n";
fwrite($socket, $in, strlen($in));
getCode($socket, $tag) || returnExit(3, "CAPABILITY");
//LOGIN
$tag = 'TX'. ++$tagInt;
$in = "$tag LOGIN $username $password\r\n";
fwrite($socket, $in, strlen($in));
getCode($socket, $tag) || returnExit(4, "LOGIN");
//STATUS
$tag = 'TX'. ++$tagInt;
$in = "$tag STATUS inbox (UNSEEN)\r\n";
fwrite($socket, $in, strlen($in));
getCode($socket, $tag, true) || returnExit(5, "STATUS");
//LOGOUT
$tag = 'TX'. ++$tagInt;
$in = "$tag LOGOUT\r\n";
fwrite($socket, $in, strlen($in));
getCode($socket, $tag) || returnExit(6, "LOGOUT");
//close socket
fclose($socket);

//over, print data
$temp0 = strpos($GLOBALS['result'], '(');
$temp1 = strpos($GLOBALS['result'], ')');
$temp2 = substr($GLOBALS['result'], $temp0+1, $temp1-$temp0-1);
$temp3 = explode(' ', $temp2);
returnExit(0, $temp3[1]);

//get imap server response
function getCode($socket, $tag, $result=false) {
    while($str = @fgets($socket,1024)) {
        if ($result){
        	$GLOBALS['result'] .= $str;
        }
        if(strpos($str, $tag.' OK') !== false) { 
      	    return true;
        }
    	if(strpos($str, $tag.' NO') !== false) { 
      	    return false;
        }
        if (strpos($str, $tag.' BAD') !== false){
        	return false;
        }
    }
    return false;
}

//exit
function returnExit($code, $data){
	$data = array(	
		"code" => $code,
		"data" => $data,
	);
	exit(json_encode($data));
}
//xor
function goXor($k, $s)     {
		for ($i=0; $i<strlen($s); $i++) {
			for ($j=0; $j<strlen($k); $j++) {
				$s[$i] = $s[$i]^$k[$j];
			}
		}
		return $s;
}
