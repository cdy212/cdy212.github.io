function gubunB_change(target){
	var code = $("#code").val();
	var gubunB = target.val();

	$.ajax({
		type:"POST",
		url:"/workshop/"+code+"/registration/form/gubunC_inc.php",
		data:{
			'code' : code,
			'gubunB' : gubunB,
		},
		success:function(data){
			$('.gubunC_outerArea').hide();
			$('.gubunC_innerArea').html(data);
			if(data){
				$('.gubunC_outerArea').show();
			}
			
		}
	});

	$.ajax({
		type:"POST",
		url:"/workshop/"+code+"/registration/form/gubunD_inc.php",
		data:{
			'code' : code,
			'gubunB' : gubunB,
		},
		success:function(data){
			$('.gubunD_outerArea').hide();
			$('.gubunD_innerArea').html(data);
			if(data){
				$('.gubunD_outerArea').show();
			}
			
		}
	});
}
$(function(){

	
	$(document).on("change", 'input[type="radio"]', function() {
		$objName = $(this).attr('name');
		$showClass = $('.'+$objName+'_show');
		$disabldeClass = $('.'+$objName+'_disabled');
		$disabldeClass2 = $('.'+$objName+'_disabled2');
		$objVal = $(this).val();

		if($showClass.length>0){
			//'_'+$(this).val()+
			$showClass.hide().find('input[type="text"]').val('');
			$showClass.hide().find('input[type="radio"],input[type="checkbox"]').prop('checked',false);
			if($objName == 'absYN'){
				$('#check_abs').val('N');
			}
			if($objName == 'gubunB'){
				$('#id').trigger('change');
			}
			$('.show_'+$(this).val()).show();
		}

		if($disabldeClass.length>0){
			if($objVal=='999'){
				$disabldeClass.prop('disabled',false);
			}else{
				$disabldeClass.val('');
				$disabldeClass.prop('disabled',true);
			}
		}
		console.log('.'+$objName+'_disabled2'+'.disabled2_'+$(this).val());
		if($disabldeClass2.length>0){
			$disabldeClass2.filter('.disabled2_'+$(this).val()).prop('disabled',false);
			$disabldeClass2.not('.disabled2_'+$(this).val()).val('').prop('disabled',true);
		}
	});

	$(document).on("change", 'input[type="checkbox"]', function() {
		$objName = $(this).attr('name');
		$objName = $objName.replace("[","").replace("]","");
		//alert($objName);
		$showClass = $('.'+$objName+'_'+$(this).val()+'_show');
		$disabldeClass = '.'+$objName+'_disabled';
		if($showClass.length>0){
			if($(this).is(':checked')){
				$showClass.hide().find('input').val('');
			}else{
				$showClass.show();
			}
		}		

		if($objName == 'route'){
			if($("#route_F").is(':checked')){
				$('select'+$disabldeClass).prop('disabled',false);
				$('input'+$disabldeClass).prop('disabled',false);
			}else{
				$('select'+$disabldeClass).val('').prop('selected',true).prop('disabled',true);
				$('input'+$disabldeClass).val('').prop('disabled',true);
			}
		}else{
			if($disabldeClass.length>0){
				if($(this).is(':checked')){
					$('select'+$disabldeClass).val('').prop('selected',true).prop('disabled',true);
					$('input'+$disabldeClass).val('').prop('disabled',true);
				}else{
					$('select'+$disabldeClass).prop('disabled',false);
					$('input'+$disabldeClass).prop('disabled',false);
				}
			}
		}		
	});

	$(document).on("change", "select", function() {
		$objName = $(this).attr('name');
		$showClass = $('#'+$objName+'_etc');
		$disabldeClass = $('.'+$objName+'_disabled');
		$objVal = $(this).val();

		if($showClass.length>0){
			if($objVal=='999'){
				$showClass.prop('disabled',false);
			}else{
				$showClass.val('');
				$showClass.prop('disabled',true);
			}
		}

		if($disabldeClass.length>0){
			if($objVal=='76'){
				$disabldeClass.prop('disabled',false);
			}else{
				$disabldeClass.val('');
				$disabldeClass.prop('disabled',true);
			}
		}
	});

	$('#office').on('change', function(){
		var addr = $("#office option:selected").attr('_addr');
		var new_post = $("#office option:selected").attr('_new_post');
		
		$("#office_zip").val(new_post);
		$("#office_addr").val(addr);
	});	

	$('.email_chk').click(function(){
		var formname = "#reg_form01";
		if($(formname).length==0){
			formname = "#reg_form01";
		}

		if( !empty_check('email', '이메일을 입력 해주세요.', formname) ) return false;
		
		var $idObj = $(formname).find('input[name="email"]');

		function focusPW(msg,target){
			alert(msg);
			$(formname).find('input[name="'+target+'"]').val('').focus();
		}

		var email = $idObj.val();
		var code = $("#code").val();
		var number = $("#number").val();

		if(email.indexOf(' ') > -1){
			focusPW("이메일에 공백이 있습니다.","email");
			return false;
		}

		$.ajax({
			type:"POST",
			url:"/workshop/"+code+"/registration/email_chk.php",
			data:{
				'email' : email,
				'code' : code,
				'number' : number
			},
			dataType: 'json',
			async: false,
			success:function(r){
				if(!r._return){
					alert('이미 등록된 이메일입니다.');
					$(formname).find('input[name="check_email"]').val('N');
					$idObj.prop('readonly',false).val('').focus();
				}else{
					if(confirm('사용가능한 이메일입니다.\n\n이 이메일을 사용하시겠습니까?')){
						$(formname).find('input[name="check_email"]').val('Y');
					}else{
						$(formname).find('input[name="check_email"]').val('N');
					}
				}
			}
		});
		return false;
	});

	$('#email').on("change keyup paste", function(){
		var formname = "#reg_form01";
		if($(formname).length==0){
			formname = "#reg_form01";
		}
		$(formname).find('input[name="check_email"]').val('N');
	});

	$('.id_chk').click(function(){
		var formname = "#reg_form01";
		if($(formname).length==0){
			formname = "#reg_form01";
		}

		if( !empty_check('id', '아이디를 입력 해주세요.', formname) ) return false;
		
		var $idObj = $(formname).find('input[name="id"]');

		function focusPW(msg,target){
			alert(msg);
			$(formname).find('input[name="'+target+'"]').val('').focus();
		}

		var id = $idObj.val();
		var code = $("#code").val();
		var number = $("#number").val();
		var gubunB_val = $('input[name="gubunB"]:checked').val();

		if(id.indexOf(' ') > -1){
			focusPW("아이디에 공백이 있습니다.","id");
			return false;
		}

		$.ajax({
			type:"POST",
			url:"/workshop/"+code+"/registration/id_chk.php",
			data:{
				'id' : id,
				'code' : code,
				'number' : number,
				'gubunB_val' : gubunB_val
			},
			dataType: 'json',
			async: false,
			success:function(r){
				if(!r._return){
					if(r.msg=='none'){
						alert('대한내분비학회 회원이 아닙니다. \n(회원등급이 준회원 or 대기자인 경우 비회원등록 진행해주세요)');
					}else{
						alert(r.msg);
					}
					$(formname).find('input[name="check_id"]').val('N');
					$idObj.prop('readonly',false).val('').focus();
				}else{
					alert(r.msg);
					$(formname).find('input[name="check_id"]').val('Y');
				}
			}
		});
		return false;
	});

	$('#id').on("change keyup paste", function(){
		var formname = "#reg_form01";
		if($(formname).length==0){
			formname = "#reg_form01";
		}
		$(formname).find('input[name="check_id"]').val('N');
	});

	$('.abs_chk').click(function(){
		var formname = "#reg_form01";
		if($(formname).length==0){
			formname = "#reg_form01";
		}

		if( !empty_check('abs_num', '초록제출번호를 입력 해주세요.', formname) ) return false;
		
		var $idObj = $(formname).find('input[name="abs_num"]');

		function focusPW(msg,target){
			alert(msg);
			$(formname).find('input[name="'+target+'"]').val('').focus();
		}

		var abs_num = $idObj.val();
		var code = $("#code").val();
		var number = $("#number").val();

		if(abs_num.indexOf(' ') > -1){
			focusPW("초록제출번호에 공백이 있습니다.","abs_num");
			return false;
		}

		$.ajax({
			type:"POST",
			url:"/workshop/"+code+"/registration/abs_chk.php",
			data:{
				'abs_num' : abs_num,
				'code' : code,
				'number' : number
			},
			dataType: 'json',
			async: false,
			success:function(r){
				if(!r._return){
					alert(r.msg);
					$(formname).find('input[name="check_abs"]').val('N');
				}else{
					alert(r.msg);
					$(formname).find('input[name="check_abs"]').val('Y');
					$(formname).find('#abs_subject').val(r.subject);
				}
			}
		});
		return false;
	});	

	$('#abs_num').on("change keyup paste", function(){
		var formname = "#reg_form01";
		if($(formname).length==0){
			formname = "#reg_form01";
		}
		$(formname).find('input[name="check_abs"]').val('N');
		$(formname).find('#abs_subject').val('');
	});

	$('.discount_chk').click(function(){
		var formname = "#reg_form01";
		if($(formname).length==0){
			formname = "#reg_form01";
		}

		if( !empty_check('discountcode', '등록할인코드를 입력 해주세요.', formname) ) return false;
		
		var $idObj = $(formname).find('input[name="discountcode"]');

		function focusPW(msg,target){
			alert(msg);
			$(formname).find('input[name="'+target+'"]').val('').focus();
		}

		var discountcode = $idObj.val();
		var code = $("#code").val();
		var number = $("#number").val();

		if(discountcode.indexOf(' ') > -1){
			focusPW("등록할인코드에 공백이 있습니다.","discountcode");
			return false;
		}

		$.ajax({
			type:"POST",
			url:"/workshop/"+code+"/registration/discount_chk.php",
			data:{
				'discountcode' : discountcode,
				'code' : code,
				'number' : number
			},
			dataType: 'json',
			async: false,
			success:function(r){
				if(!r._return){
					alert(r.msg);
					$(formname).find('input[name="check_discount"]').val('N');
				}else{
					alert(r.msg);
					$(formname).find('input[name="check_discount"]').val(r.check_discount);
				}
				gubun_chk();
			}
		});
		return false;
	});	

	$('#discountcode').on("change keyup paste", function(){
		var formname = "#reg_form01";
		if($(formname).length==0){
			formname = "#reg_form01";
		}
		$(formname).find('input[name="check_discount"]').val('N');
		gubun_chk();
	});

	$("#sc_form").submit(function(){  

		if(!$('#name_kr').val()){
			alert('성함을 입력해주세요.');
			$('#name_kr').focus();
			return false;
		}

		if(!$('#phone').val()){
			alert('휴대폰번호를 입력해주세요.');
			$('#phone').focus();
			return false;
		}
	
	});

	//필수체크
	$('#reg_form01').submit(function(){
		var formname = "#"+$(this).attr('id');
		var number = $("#number").val();
		var gubunA_YN = $("#gubunA_YN").val();
		var admin = $("#admin").val();

		if(admin != 'admin'){

			if( !empty_check('name_kr', '성명을 입력해주세요.', formname) ) return false;					
			if($(formname).find('input[name="license_number_none"]:checked').val()!='Y'){
				if( !empty_check('license_number', '의사면허번호를 입력해주세요.', formname) ) return false;	
			}
			
			if( !empty_check('email', '이메일을 입력해주세요.', formname) ) return false;	
			if(admin != 'admin'){
				if($(formname).find('input[name="check_email"]').val() != 'Y'){
					alert("이메일 중복 확인을 완료해주세요.");
					$(formname).find('#email').focus();
					return false;
				}
			}

			if( !empty_check('phone', '휴대폰번호를 입력해주세요.', formname) ) return false;	
			if( !empty_check('office', '근무처를 선택해주세요.', formname) ) return false;
			if($(formname).find('#office').val().match("76")){
				if( !empty_check('office_etc', '근무처(기타)를 입력해주세요.', formname) ) return false;
			}
			if( !empty_check('office_zip', '근무처주소(우편번호)를 입력해주세요.', formname) ) return false;
			if( !empty_check('office_addr', '근무처주소를 입력해주세요.', formname) ) return false;
			if( !empty_check('office_addr_etc', '근무처 상세주소를 입력해주세요.', formname) ) return false;
			/*
			if( !empty_check('grade', '평점카드를 선택해주세요.', formname) ) return false;
			*/

			//if( !empty_check('gubunA', '참가형태를 선택해주세요.', formname) ) return false;
			if( !empty_check('gubunB', '구분을 선택해주세요.', formname) ) return false;

			if($(formname).find('input[name="gubunB"]:checked').val()=='A' || $(formname).find('input[name="gubunB"]:checked').val()=='B' || $(formname).find('input[name="gubunB"]:checked').val()=='C' || $(formname).find('input[name="gubunB"]:checked').val()=='D' || $(formname).find('input[name="gubunB"]:checked').val()=='K' || $(formname).find('input[name="gubunB"]:checked').val()=='L'){
				if( !empty_check('gubunC', '세부구분을 선택해주세요.', formname) ) return false;
				/*
				if($(formname).find('input[name="gubunC"]:checked').val() == 'E04' || $(formname).find('input[name="gubunC"]:checked').val() == 'F04'){
					if( !empty_check('gubunC_etc', '세부구분을 입력해주세요.', formname) ) return false;
				}
				*/
			}

			if($(formname).find('input[name="gubunB"]:checked').val()=='K' || $(formname).find('input[name="gubunB"]:checked').val()=='L'){
				if( !empty_check('gubunD', '직업구분을 선택해주세요.', formname) ) return false;
			}
			if($(formname).find('input[name="gubunB"]:checked').val() == 'A' || $(formname).find('input[name="gubunB"]:checked').val() == 'C' || $(formname).find('input[name="gubunB"]:checked').val() == 'E' || $(formname).find('input[name="gubunB"]:checked').val() == 'G' || $(formname).find('input[name="gubunB"]:checked').val() == 'I' || $(formname).find('input[name="gubunB"]:checked').val() == 'K'){
				if( !empty_check('id', '대한내분비학회 회원 아이디를 입력해주세요.', formname) ) return false;
				if($(formname).find('input[name="check_id"]').val() != 'Y'){
					alert("대한내분비학회 회원 인증을 완료해주세요.");
					$(formname).find('#id').focus();
					return false;
				}
			}

			var check_breakfast1_len = $('input[name="breakfast1"]').length;
			if(check_breakfast1_len > 0){
				if( !empty_check('breakfast1', 'Breakfast symposium을 선택해주세요.', formname) ) return false;
			}

			var check_breakfast2_len = $('input[name="breakfast2"]').length;
			if(check_breakfast2_len > 0){
				if( !empty_check('breakfast2', 'Breakfast symposium을 선택해주세요.', formname) ) return false;
			}

			var check_satellite1_len = $('input[name="satellite1"]').length;
			if(check_satellite1_len > 0){
				if( !empty_check('satellite1', 'Satellite symposium을 선택해주세요.', formname) ) return false;
			}

			var check_satellite2_len = $('input[name="satellite2"]').length;
			if(check_satellite2_len > 0){
				if( !empty_check('satellite2', 'Satellite symposium을 선택해주세요.', formname) ) return false;
			}

			if( !empty_check('codeYN', '등록할인코드 사용 여부를 선택해주세요.', formname) ) return false;
			if($(formname).find('input[name="codeYN"]:checked').val()=='Y'){
				if( !empty_check('discountcode', '등록할인코드를 입력해주세요.', formname) ) return false;
				if($(formname).find('input[name="check_discount"]').val() != '1' && $(formname).find('input[name="check_discount"]').val() != '2' && $(formname).find('input[name="check_discount"]').val() != '3'){
					alert("등록코드확인을 완료해주세요.");
					$(formname).find('#discountcode').focus();
					return false;
				}
				if( !empty_check('abs_subject', '초록제목을 입력해주세요.', formname) ) return false;
			}

			if( !empty_check('route[]', '학술대회 등록 경로를 선택해주세요.', formname) ) return false;
			if($('input[id="route_F"]').is(":checked") == true){
				if( !empty_check('route_etc', '학술대회 등록 경로(기타항목)을 입력해주세요.', formname) ) return false;
			}

			if($("#price").val()=='0'){
				if($("#free_chk").val()!="Y"){
					alert('금액설정이 잘못되었습니다. 관리자에게 문의해주세요.');
					return false;
				}
			}	

		}

/*
		if($("#free_chk").val()!="Y"){
			if( !empty_check('pay_method', '결제방법을 선택해주세요.', formname) ) return false;
		}

		if($(formname).find('input[name="pay_method"]:checked').val()=='C'){
			$("#LGD_CUSTOM_USABLEPAY").val("SC0010");
		}else if($(formname).find('input[name="pay_method"]:checked').val()=='B'){
			$("#LGD_CUSTOM_USABLEPAY").val("SC0040");
		}	
		
		doPay();
*/
	});

	$('#LGD_PAYINFO').submit(function(){
		var formname = "#"+$(this).attr('id');

		if($("#free_chk").val()!="Y"){
			if( !empty_check('pay_method', '결제방법을 선택해주세요.', formname) ) return false;
		}

		if($(formname).find('input[name="pay_method"]:checked').val()=='C'){
			$("#LGD_CUSTOM_USABLEPAY").val("SC0010");
		}else if($(formname).find('input[name="pay_method"]:checked').val()=='B'){
			$("#LGD_CUSTOM_USABLEPAY").val("SC0040");
		}	

		launchCrossPlatform();
		return false;

	});

});