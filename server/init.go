//
// Author Cloud@txthinking.com
//
package main

import (
	"runtime"
)

func init() {
	//runtime.GOMAXPROCS(runtime.NumCPU())
	runtime.GOMAXPROCS(1)
}
