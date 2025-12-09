
// DOM 이 모두 로드 되었을 때 실행
jQuery(function() {
//GNB 

	if ($("div#container").attr("class") == "main") {
		$("div.wrapper").addClass("mainWrap");
	}

	if ($("div.mainBnr li").length > 1) {
		$("div.mainBnr ul").bxSlider({
			mode:'fade',
			pause:6000,
			speed:2000,
			controls:false,
			auto:true
		});
	}

	if ($("dl.sponsor li").length > 5) {
		$("dl.sponsor ul").bxSlider({
			minSlides:5,
			maxSlides:5,
			moveSlides:1,
			slideWidth:177,
			slideMargin:11,
			pager:false,
			auto:true
		});
	}

	if ($("div.sponsor").length) {
		for (var i=0;i<$("div.sponsor dd").length;i++) {
			var spanBnr = $("div.sponsor dd").eq(i).find("li");
			if (spanBnr.length > 2) {
				$("div.sponsor dd").eq(i).find("ul").bxSlider({
					minSlides:2,
					maxSlides:2,
					moveSlides:1,
					slideWidth:177,
					slideMargin:12,
					pager:false,
					auto:true
				});
			}
		}
	}

	if ($("div.sponsor_new").length) {

		$('dl.gold2 dd > ul').bxSlider({
			slideWidth : 259,
			slideMargin : 10,
			maxSlides : 4,
			minSlides : 4,
			moveSlides : 4,
			speed : 4000,
			controls: true,
			pager : false,
			auto:true
		});

		$('dl.sliver2 dd > ul').bxSlider({
			slideWidth : 149,
			slideMargin : 10,
			maxSlides : 3,
			minSlides : 3,
			moveSlides : 3,
			speed : 2000,
			controls: true,
			pager : false,
			auto:true
		});

		$('dl.bronze2 dd > ul').bxSlider({
			slideWidth : 144,
			slideMargin : 10,
			maxSlides : 3,
			minSlides : 3,
			moveSlides : 3,
			speed : 2000,
			controls: true,
			pager : false,
			auto:true
		});
	}

// 탭메뉴
	var tabArea = $(".tabArea");
	if (tabArea.length > 0) {
		
		for	(var i=0 ; i<tabArea.length ; i++) {
			var tabMenu = tabArea.eq(i).find("ul.tabMenu > li"),
				tabCon = tabArea.eq(i).find(".tabCon");
			
			tabMenu.removeClass("on").eq(0).addClass("on");
			tabCon.hide().eq(0).show();
		}
		
		tabArea.on("click", "ul.tabMenu a", function(){
			var currTabMenu =  $(this).parent().parent().parent().find("ul.tabMenu li"),
				currTabCon =  $(this).parent().parent().parent().find(".tabCon"),
				currIdx = $(this).parent().index();
		
			currTabMenu.removeClass("on").eq(currIdx).addClass("on");
			currTabCon.hide().eq(currIdx).show();

			return false
		});
		
	}


/* Program at a Glance */
	if ($("div.glance").length) {
		$("ul.subMenu a").on("click", function(){
			var nIdx = $(this).parent().index();

			if (nIdx == 0) {
				$("div.glance > div").show();
			} else {
				num = nIdx - 1;
				$("div.glance > div").hide();
				$("div.glance > div").eq(num).show();
			}
			
			$("ul.subMenu li").removeClass("on");
			$("ul.subMenu li").eq(nIdx).addClass("on");

			return false
		});
	}


//toggle
	$("a.trigger").on("click", function(){
		var _currToggle = $(this).parent().parent(),
			sClass = $(this).parent().attr("class");
		
		if (sClass != "view") {
			$(this).parent().addClass("view");
			$(this).find("i").attr("class",  function(i){
				var src = $(this).attr("class");
				return src.replace("-down", "-up");
			});
			_currToggle.find(".toggleCon").slideDown();
		} else {
			$(this).parent().removeClass("view");
			$(this).find("i").attr("class",  function(i){
				var src = $(this).attr("class");
				return src.replace("-up", "-down");
			});
			_currToggle.find(".toggleCon").slideUp();
		}

		return false
	});




//게시판 타이틀관련 
//2016.08.09 수정 : 정세영
		var bbsList = $("table.bbs, dl.bbsList");
		if (bbsList.length) {
			var bbsTit = $(".tit"),
				bbsTit_w = $(".tit").width();

			for (var i=0 ; i < bbsTit.length ; i++) {
	
				var bbsLink = bbsTit.eq(i).find("a"),
					bbsLink_reWidth = bbsTit_w - 25;
				bbsLink.width(bbsLink_reWidth);
				bbsLink.find("span:first-child").css("width","auto");
	
				var bbsLinkTxt_w = bbsLink.find("span:first-child").width();
				if (bbsLinkTxt_w < bbsLink_reWidth) {
					bbsLink_reWidth = bbsLinkTxt_w;
				}
				bbsLink.width(bbsLink_reWidth + 2);
				bbsLink.find("span:first-child").width(bbsLink_reWidth);
			}
		}
});




/**/

function bbsTit() {
	$("table.bbs td.tit a").removeAttr("style");
	$("table.bbs td.tit span").removeAttr("style");

	var bbsList = $("table.bbs");
	if (bbsList.length) {
		var bbsTit = $("table.bbs .tit"),
			bbsTit_w = $("table.bbs .tit").width();

		for (var i=0 ; i < bbsTit.length ; i++) {

			var bbsLink = bbsTit.eq(i).find("a"),
				bbsLink_reWidth = bbsTit_w;

			bbsLink.width(bbsLink_reWidth);
			bbsLink.find("span:first-child").css("width","auto");

			var bbsLinkTxt_w = bbsLink.find("span:first-child").width();
			if (bbsLinkTxt_w < bbsLink_reWidth) {
				bbsLink_reWidth = bbsLinkTxt_w;				
			} 

			var sClass = bbsLink.attr("class"),
				re_paddingR = 5;

			if (sClass != null) {
					bbsNew = sClass.indexOf("new"),
					bbsFile = sClass.indexOf("attach"),
					bbsReply = sClass.indexOf("reply");

				if (bbsNew != -1) {
					bbsLink_reWidth = bbsLink_reWidth - bbsLink.find("img.new").outerWidth();				
					re_paddingR = re_paddingR + bbsLink.find("img.new").outerWidth();
				}
				if (bbsFile != -1) {
					bbsLink_reWidth = bbsLink_reWidth - bbsLink.find(".attach").outerWidth();		
					re_paddingR = re_paddingR + bbsLink.find(".attach").outerWidth();
				}
				if (bbsReply != -1) {
					bbsLink_reWidth = bbsLink_reWidth - bbsLink.find("span.reply").outerWidth();		
					re_paddingR = re_paddingR + bbsLink.find("span.reply").outerWidth();
				}

				if ((bbsNew != -1) && (bbsFile != -1) && (bbsReply != -1)) {
					var re_poRight = bbsLink.find("span.reply").outerWidth() + bbsLink.find("img.new").outerWidth() + 4
					bbsLink.find(".attach").css({"right":re_poRight})
				}
				
				var bbsLink_sumW = bbsLink_reWidth + re_paddingR;
				if (bbsLink_sumW < (bbsTit_w - 10)) {
					bbsLink_reWidth = bbsLink.find("span:first-child").width() + 5;
				}
			}
				bbsLink.css({
					"width" : bbsLink_reWidth,
					"padding-right" : re_paddingR
				});
				bbsLink.find("span:first-child").width(bbsLink_reWidth);


		}
	}

}





function empty_check(inputname, rtext, formname){
	var inputType = $(formname).find('input[name="'+inputname+'"]').attr('type'), selectType = 'input', noneText = false;
	
	if(!inputType){
		selectType = $(formname).find('[name="'+inputname+'"]')[0]['nodeName'];
	}else{
		if(inputType=='text'||inputType=='password') noneText = false;
		else noneText = true;
	}

	if(!noneText){
		if( !$.trim($(formname).find(selectType+'[name="'+inputname+'"]').val()) ){
			alert(rtext);
			$(formname).find(selectType+'[name="'+inputname+'"]').focus();
			return false;
		}else{
			return true;
		}
	}else{
		if( !$(formname).find(selectType+'[name="'+inputname+'"]').is(':checked') ){
			alert(rtext);
			$(formname).find(selectType+'[name="'+inputname+'"]').eq(0).focus();
			return false;
		}else{
			return true;
		}
	}	
}

function myfunction2 (param,ph) {
	var result = confirm(param);
	if(result==true){
		location.href=ph;
	}else{
		return false;
	}
}

function openDaumPostcode(code_name, addr_name) {
	var code_name = $.trim(code_name)?code_name:'zipcode',
		addr_name = $.trim(addr_name)?addr_name:'addr';
	
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
			// 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
			if(data.buildingName!=""){
				bulid = "("+data.buildingName+")";
			}else{
				bulid = "";
			}
			document.getElementById(code_name).value = data.zonecode;
			document.getElementById(addr_name).value = data.roadAddress+bulid;
			document.getElementById(addr_name).focus();
		}
	}).open();
}


function popup_call(str,width,height,number,type){
	tit = str.replace("/","");
	code = $("#code").val();
	if(number){
		if(tit='popup_code'){
			num = '?abyear='+number;
		}else{
			num = '?number='+number;
		}
	}else{
		num = '';
	}
	window.open("/workshop/"+code+"/popup/"+str+".php"+num,tit,"top=0, left=0, width="+width+", height="+height);
}

function validateInputString(inputString, workType){
	var v_normal = '';
		
	if(workType == "onlyNumber"){
		v_normal = /[^0-9]/g; 
	}else if(workType == "onlyAlphabet"){
		v_normal = /[^a-zA-Z]/g;
	}else if(workType == "onlySmallAlphabet"){
		v_normal = /[^a-z]/g;
	}else if(workType == "onlyCapitalAlphabet"){
		v_normal = /[^A-Z]/g;
	}else if(workType == "onlyHangul"){ // 한글(초성 포함)만 가능
		v_normal = /[^ㄱ-ㅎ가-힣]/g; //본래는 '히+ㅎ'까지 체크해야 하나 euc-kr은 '힝'까지만 가능
	}else if(workType == "onlyHangulWhiteSpace"){ // 한글, 공백만 가능
		v_normal = /[^ㄱ-ㅎ가-힣\s]/g;	
	}else if(workType == "onlyPerfectHangul"){ // 한글(초성 제외)만 가능
		v_normal = /[^가-힣]/g;
	}else if(workType == "onlyEmail"){ // 이메일 주소(영문자, 숫자, dot(.))만 가능
		v_normal = /[^a-zA-Z0-9._-]/g;
	}else if(workType == "only_Alphabet_Hangul"){ // 한글불가
		v_normal = /[^a-zA-Z0-9]/g;
	}else if(workType == "only_Alphabet_ABS"){ // 영어,공백,특수기호
		v_normal = /[^a-zA-Z0-9<>_!@#$%^&*(\-)¹ ² ³ ⁴,\n]/g;
	}else if(workType == "only_Hangul_ABS"){ // 한글,공백,특수기호
		v_normal = /[^ㄱ-ㅎ가-힣\s0-9<>!@#$%^&*()¹ ² ³ ⁴,\n]/g;
	}else{
		alert("정규식 선택이 부적합합니다.");
		return "";
	}
	if(v_normal.test(inputString)){
		var v_result = inputString.replace(v_normal, '');
		//   alert("result : "+ v_result);
		return v_result;
	}else{
		return inputString;
	}
 }


function onlyHangul(inputObj){
	inputObj.value = validateInputString(inputObj.value, "onlyHangul");
}
function onlyNumber(inputObj){
	if(!(event.keyCode >=37 && event.keyCode<=40)){
	inputObj.value = validateInputString(inputObj.value, "onlyNumber");
	}
}
function onlyAlphabet(inputObj){
	inputObj.value = validateInputString(inputObj.value, "onlyAlphabet");
}
function onlyEmail(inputObj){
	inputObj.value = validateInputString(inputObj.value, "onlyEmail");
}
function only_Alphabet_Hangul(inputObj){
	inputObj.value = validateInputString(inputObj.value, "only_Alphabet_Hangul");
}
function only_Alphabet_ABS(inputObj){
	inputObj.value = validateInputString(inputObj.value, "only_Alphabet_ABS");
}
function only_Hangul_ABS(inputObj){
	if(!(event.keyCode >=37 && event.keyCode<=40)){
		inputObj.value = validateInputString(inputObj.value, "only_Hangul_ABS");
	}
}


//파일체크
function getThumbnailPrivew(html,target) {
	
	var image_type = html.files[0]['type'];
	var image_size = Math.floor(html.files[0]['size']/1024);
	var extension  = html.files[0]['name'].split('.');
	var denyfile = "jpeg,JPEG,jpg,JPG,gif,GIF,png,PNG,pptx,PPTX,ppt,PPT,pdf,PDF,doc,DOC,docx,DOCX,xlsx,XLSX,xlsm,XLSM,xlsd,XLSD,xltx,XLTX,xls,XLS,xlt,XLT,xml,XML,xlam,XLAM,text,TEXT,txt,TXT,hwp,HWP"; 
	
	if( target == "a_file1" || target == "a_file2" ){
		if( extension.reverse()[0] != "jpg" && extension.reverse()[0] != "JPG" && extension.reverse()[0] != "png" && extension.reverse()[0] != "PNG" && extension.reverse()[0] != "gif" && extension.reverse()[0] != "GIF" ){
			alert("jpg, png, gif 파일만 업로드 가능합니다.");
			$("#"+target).val("");
			$("#"+target+"_name").val("");
			return;
		}
	}else if( target == "reg_a_file1" || target == "reg_a_file2" ){
		if( extension.reverse()[0] != "jpg" && extension.reverse()[0] != "JPG" && extension.reverse()[0] != "jpeg" && extension.reverse()[0] != "JPEG" && extension.reverse()[0] != "png" && extension.reverse()[0] != "PNG" && extension.reverse()[0] != "gif" && extension.reverse()[0] != "GIF" && extension.reverse()[0] != "pdf" && extension.reverse()[0] != "PDF"){
			alert("jpg, jpeg, png, gif, pdf 파일만 업로드 가능합니다.");
			$("#"+target).val("");
			$("#"+target+"_name").val("");
			return;
		}
	}
		
}

function file_check(file,name){
	if( file && $("#"+name).is(":checked") == false ){
		alert("이미 첨부되어있는 파일이 있습니다. 삭제 체크 후 변경해주세요.");
		return false;
	}else{
		return true;
	}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}