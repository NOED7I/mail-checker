//
// Author Cloud@txthinking.com
//
package main

import (
	"testing"
)

func TestKey(t *testing.T) {
	for i := 0; i < 100; i++ {
		s := Key()
		t.Log(s)
	}
}
