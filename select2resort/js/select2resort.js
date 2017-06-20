/**
 * Created by Liqiaomiao on 2017/6/20.
 * https://github.com/Liqiaomiao/select2issues
 */
$(document).ready(function () {
    //初始化
    var $selecttag =  $(".selecttag").select2();
    $(".selecttag").on('select2:open', function (evt) {//加滚动条
        $(".select2-results ul.select2-results__options").unbind("mousewheel");
        $('.select2-results').mCustomScrollbar();
    });
    //点击其他地方关闭下拉；
    $(document).on("mouseup",function (event) {
        var tcaname = event.target.className;
        if(tcaname.indexOf("select2")===-1){
            $(".selecttag").select2("close")
        }
    });
    //重排序开始
    function select2_renderSelections(obj) {
        var  order = obj.data('preserved-order') || [];
        var $container = obj.next('.select2-container');
        var $tags = $container.find('li.select2-selection__choice');
        var $input= $tags.last().next();
        for(var i=0;i<order.length;i++){
            var val =order[i];
            var $el = $tags.filter(function(i,tag){
                return $(tag).data('data').text === val;
            });
            $input.before( $el );
        }
    }
    function selectionHandler(e) {
        var val= e.params.data.text;//当前被选中的值；
        var $this = $(this);
        var order =  $this.data('preserved-order') || [];
        switch (e.type){
            case 'select2:select':
                order[order.length] = val;
                break;;
            case 'select2:unselect':
                var found_index = order.indexOf(val);
                if (found_index >= 0 ){
                    order.splice(found_index,1);
                };
                break;
        }
        $this.data('preserved-order', order);
        select2_renderSelections($this);


    }
    $selecttag.on('select2:select select2:unselect', selectionHandler);
    //重排序结束
    //取值测试，以第一个为例；
    $(".getresortval").on("click",function () {
        var values=[];
        var $valuelist =  $(".w200:first ").find(".select2-selection__choice:visible");
        $valuelist.each(function (index,item) {
            values[index]=$(item).attr("id")
        });
        alert(values)

    });
//    ie8兼容indexof();
    if (!Array.prototype.indexOf)
    {
        Array.prototype.indexOf = function(elt /*, from*/)
        {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
})