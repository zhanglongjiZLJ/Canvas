$(document).ready(function() {
	var arr_c,arr_r,length_r = 0,length_c = 0;
	var canvas_length = $(".canvas-content").children("canvas").length;
	/**
	 * 点击提交按钮
	 */
	$(".submit").click(function() {
		$(".canvas-content").empty();
		//三角形斜边与底
		var san_xie = Number($(".san-xie").val());
		var san_di = Number($(".san-di").val());
		//梯形上底、下底、与斜边
		var ti_top = Number($(".ti-top").val());
		var ti_bottom = Number($(".ti-bottom").val());
		var ti_xie = Number($(".ti-xie").val());
		//矩形的宽和高
		var ju_width = Number($(".ju-width").val());
		var ju_height = Number($(".ju-height").val());
		var sun_width = 1.65;
		var sun_height = 1.05;
		//是否组成三角形
		if($("#triangle").prop("checked")) {
			if(2 * san_xie > san_di && 2 * san_di > san_xie && san_di != "" && san_xie != "") {
				for (var j = 0;j < 2;j++) {
					create_node();
				} 
				jisuan_sanjiao(san_xie,san_di,sun_width,sun_height);
				draw_sanjiao(0,arr_r,san_di,san_xie,sun_width,sun_height,"rgb(150, 215, 21)","stroke");
				draw_sanjiao(1,arr_c,san_di,san_xie,sun_width,sun_height,"rgb(150, 215, 21)","stroke");
				$(".info").eq(0).html('组件横放,底边:'+san_di+'米,斜边'+san_xie+'米,共：'+length_r+'片 .');
				$(".info").eq(1).html('组件纵放,底边:'+san_di+'米,斜边'+san_xie+'米,共：'+length_c+'片 .');
			} else {
				alert("不组成三角形！");
			}
		}
		
		
		//是否组成梯形
		if($("#trapezoid").prop("checked")) {
			if(ti_bottom > ti_top && ti_xie != 0 && (2 * ti_xie + ti_top) > ti_bottom) {
				for (var j = 0;j < 2;j++) {
					create_node();
				}
				jisuan_tixing(ti_top, ti_bottom, ti_xie,sun_width,sun_height);
				draw_tixing(0, ti_top, ti_bottom, ti_xie,sun_width,sun_height,arr_r ,"rgb(150, 215, 21)", "stroke");
				draw_tixing(1, ti_top, ti_bottom, ti_xie,sun_width,sun_height,arr_c ,"rgb(150, 215, 21)", "stroke");
				$(".info").eq(0).html('组件横放,上边:'+ti_top+'米,下底:'+ti_bottom+'米 ,斜边：'+ti_xie+'米 ,共：'+length_r+'片 .');
				$(".info").eq(1).html('组件纵放,上边:'+ti_top+'米,下底:'+ti_bottom+'米 ,斜边：'+ti_xie+'米 ,共：'+length_c+'片 .');
			} else if(ti_bottom < ti_top && ti_xie != 0 && (2 * ti_xie + ti_top) > ti_bottom) {
				alert("下底应大于上底！");
			} else {
				alert("不组成梯形！");
			}
		}
		//是否组成矩形
		if($("#rectangle").prop("checked")) {
			if((ju_width != 0 && ju_height != 0)) {
				for (var j = 0;j < 2;j++) {
					create_node();
				} 
				jisuan_juxing (ju_width, ju_height,sun_width,sun_height);
				draw_juxing(0,arr_r,ju_width,ju_height,sun_width,sun_height,"rgb(150, 215, 21)","stroke");//横向
				draw_juxing(1,arr_c,ju_width,ju_height,sun_width,sun_height,"rgb(150, 215, 21)","stroke");//纵向
				$(".info").eq(0).html('组件横放,底边:'+ju_width+'米,高:'+ju_height+'米,共：'+length_r+'片 .');
				$(".info").eq(1).html('组件纵放,底边:'+ju_width+'米,高:'+ju_height+'米,共：'+length_c+'片 .');
			} else {
				alert("不组成矩形")
			}
		}
		//
		if($("#rectangle").prop("checked") == false && $("#trapezoid").prop("checked") == false && $("#triangle").prop("checked") == false) {
			alert("请选择类型！")
		}
	});
	/**
	 * 创建节点
	 */
	function create_node () {
		for(var i = 0; i < 1; i++) {
			var canvas_obj = '<canvas class="canvas" width="100" height="100"></canvas><p class="info"></p>';
			$(".canvas-content").append(canvas_obj);
			$(".canvas").attr("width", $(".canvas-content").width());
			$(".canvas").attr("height", $(".canvas").width());
			canvas_length = $(".canvas-content").children("canvas").length;
		}
	}
	
	/**
	 * 绘制图形
	 */
	/**
	 * 画矩形
	 */
	function draw_juxing(i,arr, width, height,sun_width,sun_height,color,type) {
		var canvas = document.getElementsByClassName("canvas")[i];
		if(canvas.getContext) {
			var ctx = canvas.getContext('2d');
			var canvas_width = $(".canvas").eq(i).width();
			var canvas_height = $(".canvas").eq(i).height();
			var scale = width / (canvas_width - 2);
			var _width = width / scale;
			var _height = height / scale;
			$(".canvas").eq(i).attr("height", _height);
			canvas_width = $(".canvas").eq(i).width();
			canvas_height = $(".canvas").eq(i).height();
			var x = (canvas_width - width / scale) / 2;
			var y = canvas_height - height / scale;
			ctx[type + 'Style'] = color;
			ctx.strokeRect(x, y+2, _width, _height-2);
			ctx.closePath();
			ctx[type]();
			if (i == 0) {
				//横向
				var left_width = (width - sun_width * parseInt(arr_r[0]))/2;//居中显示  距左侧宽度
				for (var i = 0;i < parseInt(arr[1]);i++) {
					for (var j = 0;j < parseInt(arr[0]);j++) {
						if (arr[0] >= 2) {
							ctx.beginPath();
							ctx.strokeRect(left_width/scale + sun_width / scale * j,(_height - sun_height/ scale*i -sun_height/scale), sun_width/ scale, sun_height/ scale);
							ctx.closePath();
						}
					}
				}
			}else{
				//纵向
				var left_width = (width - sun_height * parseInt(arr_c[0]))/2;//居中显示  距左侧宽度
				for (var i = 0;i < parseInt(arr[1]);i++) {
					for (var j = 0;j < parseInt(arr[0]);j++) {
						if (arr[0] >= 2) {
							ctx.beginPath();
							ctx.strokeRect(left_width/scale + sun_height / scale * j,(_height - sun_width/ scale*i -sun_width/scale), sun_height/ scale, sun_width/ scale);
							ctx.closePath();
						}
					}
				}
			}
		}
	}
	/**
	 * 计算矩形
	 */
	function jisuan_juxing (width, height,sun_width,sun_height) {
		length_r = 0; length_c = 0;
		//横排
		var sun_heightount_r = width / sun_width;//横向可放个数
		var sun_widthount_r = height / sun_height;//纵向可放个数
		arr_r = [parseInt(sun_heightount_r),parseInt(sun_widthount_r)];
		length_r =  parseInt(arr_r[0])*parseInt(arr_r[1]);
		//纵排
		var sun_heightount_c = width / sun_height;//横向可放个数
		var sun_widthount_c = height / sun_width;//纵向可放个数
		arr_c = [parseInt(sun_heightount_c),parseInt(sun_widthount_c)];
		length_c = parseInt(arr_c[0])*parseInt(arr_c[1]);
	}
	/**
	 * 绘制三角形
	 */
	var _sun_height,_sun_width;
	function draw_sanjiao(i,arr, di, xie,sun_width,sun_height, color, type) {
		var x1, y1, x2, y2, x3, y3;
		var canvas = document.getElementsByClassName("canvas")[i];
		if(canvas.getContext) {
			var ctx = canvas.getContext('2d');
			var canvas_width = $(".canvas").eq(i).width();
			var canvas_height = $(".canvas").eq(i).height();
			var scale = di / (canvas_width - 2);
			
			var height = Math.sqrt(Math.pow(xie, 2) - Math.pow((di / 2), 2));
			var _height = height / scale;
			
			
			var cos = (di/2)/xie;
			var sin = Math.sqrt(1 - Math.pow(cos, 2));
			var tan = sin/cos;
			//纵向
			_sun_height = sun_width/tan;
			
			//横向
			_sun_width = sun_height/tan;
			
			
			$(".canvas").eq(i).attr("height", _height);
			canvas_width = $(".canvas").eq(i).width();
			canvas_height = $(".canvas").eq(i).height();
			x1 = (canvas_width - di / scale) / 2;
			y1 = canvas_height;
			x2 = x1 + di / scale;
			y2 = canvas_height;
			x3 = canvas_width / 2;
			y3 = canvas_height - height / scale;
			ctx.beginPath();
			ctx.moveTo(x1, y1 - 1);
			ctx.lineTo(x2, y2 - 1);
			ctx.lineTo(x3, y3);
			ctx[type + 'Style'] = color;
			ctx.closePath();
			ctx[type]();
			//横向
			ctx.beginPath();
			var left_width = 0,first_width = 0;
			if (i == 0) {
				for (var i = 0;i < arr.length;i++) {
					if (i == 0) {
						first_width = (di - arr[0] * sun_width)/2;
						left_width = first_width;
					} else{
						left_width = ((arr[0] - arr[i]) / 2) * sun_width + first_width;
					}
					
					for (var j = 0; j < arr[i];j++) {
						ctx.strokeRect((left_width / scale) + sun_width/ scale * j, (_height - sun_height/ scale*i - sun_height/scale), sun_width/ scale, sun_height/ scale);
					}
				}
			}else{
				//纵向
				for (var i = 0;i < arr.length;i++) {
					if (i == 0) {
						first_width = (di - arr[0] * sun_height)/2;
						left_width = first_width;
					} else{
						left_width = ((arr[0] - arr[i]) / 2) * sun_height + first_width;
					}
					
					for (var j = 0; j < arr[i];j++) {
						ctx.strokeRect((left_width / scale) + sun_height / scale * j , (_height - sun_width/ scale*i - sun_width/scale), sun_height/ scale, sun_width/ scale);
					}
				}
			}
			ctx[type + 'Style'] = color;
			ctx.closePath();
			ctx[type]();
		}
	}
	/**
	 * 
	三角形计算临界值与每排个数
	*/
	function jisuan_sanjiao (san_xie,san_di,sun_width,sun_height) {
		length_c = 0;length_r = 0;
		var height = Math.sqrt(Math.pow(san_xie, 2) - Math.pow((san_di / 2), 2));
		var cos = (san_di/2)/san_xie;
		var sin = Math.sqrt(1 - Math.pow(cos, 2));
		var tan = sin/cos;
		//纵向
		_sun_height = sun_width/tan;
		var _sun_width = parseInt(height/sun_width);
		var _sun_width_z = sun_height*tan;
		var _count_c = (height-_sun_width_z)/sun_width;//可放几排
		arr_c = [];
		//每排个数计算
		for (var i = 1;i < _count_c + 1;i++) {
			if ((san_di - i * _sun_height * 2) >= (2 * sun_height)) {
				arr_c.push(parseInt((san_di - i * _sun_height * 2)/sun_height))
			}
		}
		for (var j = 0;j < arr_c.length;j++) {
			length_c += arr_c[j]
		}
		//横向
		_sun_width = sun_height/tan;
		var _sun_height = parseInt(height/sun_height);
		var _sun_height_z = sun_width*tan;
		var _count_r = (height-_sun_height_z)/sun_height;//可放几排
		arr_r = [];
		//每排个数计算
		for (var i = 1;i < _count_r + 1;i++) {
			if ((san_di - i * _sun_width * 2) >= (2 * sun_width)) {
				arr_r.push(parseInt((san_di - i * _sun_width * 2)/sun_width))
			}
		}
		for (var j = 0;j < arr_r.length;j++) {
			length_r += arr_r[j]
		}
	}
	/**
	 * 绘制梯形
	 */
	function draw_tixing(i, top_di, bottom_di, xie,sun_width,sun_height,arr, color, type) {
		var x1, y1, x2, y2, x3, y3, x4, y4;
		var canvas = document.getElementsByClassName("canvas")[i];
		if(canvas.getContext) {
			var ctx = canvas.getContext('2d');
			var canvas_width = $(".canvas").eq(i).width();

			var height = Math.sqrt(Math.pow(xie, 2) - Math.pow(((bottom_di - top_di) / 2), 2));
			var canvas_height = $(".canvas").eq(i).height();
			var scale = bottom_di / canvas_width;
			var _height = height / scale;
			$(".canvas").eq(i).attr("height", _height);
			canvas_width = $(".canvas").eq(i).width();
			canvas_height = $(".canvas").eq(i).height();
			x1 = (canvas_width - bottom_di / scale) / 2;
			y1 = canvas_height;
			x2 = x1 + bottom_di / scale;
			y2 = canvas_height;
			x3 = x1 + (bottom_di / scale - top_di / scale) / 2 + top_di / scale;
			y3 = canvas_height - height / scale;
			x4 = x1 + (bottom_di / scale - top_di / scale) / 2;
			y4 = y3;

			ctx.beginPath();
			ctx.moveTo(x1, y1 - 1);
			ctx.lineTo(x2, y2 - 1);
			ctx.lineTo(x3, y3+1);
			ctx.lineTo(x4, y4+1);
			ctx[type + 'Style'] = color;
			ctx.closePath();
			ctx[type]();
			//横向绘制
			ctx.beginPath();
			arr.sort(function (x,y) {
	            return y-x;
	       });
			var left_width = 0,first_width = 0;
			if (i == 0) {
				for (var i = 0;i < arr.length ;i++) {
					if (i == 0) {
						first_width = (bottom_di - arr[0] * sun_width)/2;
						left_width = first_width;
					} else{
						left_width = ((arr[0] - arr[i]) / 2) * sun_width + first_width;
					}
					
					for (var j = 0; j < arr[i];j++) {
						ctx.strokeRect((left_width / scale) + sun_width/ scale * j, (canvas_height - sun_height/ scale*i - sun_height/scale), sun_width/ scale, sun_height/ scale);
					}
				}
			}else{
				//纵向
				for (var i = 0;i < arr.length;i++) {
					if (i == 0) {
						first_width = (bottom_di - arr[0] * sun_height)/2;
						left_width = first_width;
					} else{
						left_width = ((arr[0] - arr[i]) / 2) * sun_height + first_width;
					}
					
					for (var j = 0; j < arr[i];j++) {
						ctx.strokeRect((left_width / scale) + sun_height / scale * j , (canvas_height - sun_width/ scale*i - sun_width/scale), sun_height/ scale, sun_width/ scale);
					}
				}
			}
			ctx[type + 'Style'] = color;
			ctx.closePath();
			ctx[type]();
			
			
		}
	}
	/**
	 * 计算梯形
	 */
	function jisuan_tixing (ti_top, ti_bottom, ti_xie,sun_width,sun_height) {
		length_c = 0;length_r = 0;
		var ti_height = Math.sqrt(Math.pow(ti_xie, 2) - Math.pow(((ti_bottom - 2 * ti_top)/2), 2));
		var ti_tan = ti_height/((ti_bottom - ti_top)/2);
		arr_r = [];
		//横向排布
		var ti_left_r = sun_height/ti_tan;//左边距
		//可放几排
		var count_r = ti_height / sun_height;
		//每排个数
		for (var i = 1;i <= count_r;i++) {
			if ((ti_bottom - 2*ti_left_r*i) > (2 * sun_width)) {
				arr_r.push(parseInt((ti_bottom - 2*ti_left_r*i)/sun_width));
			}
		}
		for (var j = 0;j < arr_r.length;j++) {
			length_r += arr_r[j]
		}
		//纵向排布
		arr_c = [];
		var ti_left_c = sun_width/ti_tan;
		//可放几排
		var count_c = ti_height / sun_width;
		//每排个数
		for (var i = 1;i <= count_c;i++) {
			if ((ti_bottom - 2*ti_left_r*i) > (2 * sun_width)) {
				arr_c.push(parseInt((ti_bottom - 2*ti_left_c*i)/sun_height));
			}
		}
		for (var j = 0;j < arr_c.length;j++) {
			length_c += arr_c[j]
		}
	}
})