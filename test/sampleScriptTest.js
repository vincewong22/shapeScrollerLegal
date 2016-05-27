TestCase("multiply test", {
    "test mulply 2 positiives": function(){
        assertEquals(4,multiply(2,2));
    }
});

TestCase("award message", {
    "simpliest shape should be circle": function(){
        assertEquals("award1",decideAward(0));
    }
});

TestCase("dif message h", {
    "simpliest shape should be circle": function(){
        assertEquals("hard",decideDiffculty(0));
    }
});
TestCase("dif message d", {
    "simpliest shape should be circle": function(){
        assertEquals("mid",decideDiffculty(1));
    }
});
TestCase("dif message c", {
    "simpliest shape should be circle": function(){
        assertEquals("easy",decideDiffculty(2));
    }
});

