
// 测试接口
fetchData();

function fetchData () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', process.env.BASE_API + 'api/test', true),
    xhr.send();
    xhr.onload = function () {
        var res = null;
        try {
            res = JSON.parse(xhr.responseText);
        } catch (e) {
            res  = xhr.responseText;
        }
        console.log(res);
    };
    xhr.onerror = function () {
        var res = null;
        try {
            res = JSON.parse(xhr.responseText);
        } catch (e) {
            res  = xhr.responseText;
        }
        console.log(res);
    }
}