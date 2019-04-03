$(function () {
	var height = $(window).height() - 129;
	
	elFinder.prototype.i18.en.messages['cmddownloadcustom'] = '下载';
	elFinder.prototype._options.commands.push('downloadcustom');
	elFinder.prototype.commands.downloadcustom = function() {
				var self  = this,
				fm    = self.fm;
				this.exec = function(hashes) {
					var fm = this.fm;
					var files = this.files(hashes);

					if(files.length==1&&files[0].dirs!=1){
						var a = document.getElementById("downhref");
						a.href=files[0].url;
						a.download=files[0].name;
						a.click();
						return;
					}

					//js方法
					for(i=0;i<files.length;i++)
					{
						if(files[i].dirs==1)
						{
							var dirId =files[i].hash.split("_")[0];
							$.ajax({
								type: "get",
								url:"/task/ziliao/dirdownload/",
								cache: false,
								async: false,
								dataType: "json",
								data: {"dirId":dirId},
								success: function(data) {
									if(data.issuc == "true" ) {
										 var a = document.getElementById("downhref");
										 a.href=data.url;
										 a.download=files[i].name+".zip";
										 a.click();
									}else{
										alert(data.error);
									}
								}
							});
							break;
						}else{
							 var a = document.getElementById("downhref");
							 a.href=files[i].url;
							 a.download=files[i].name;
							 a.click();
						}
					}

				}
				this.getstate = function(sel) {
					//return 0 to enable, -1 to disable icon access
					var fm = this.fm;
					var sel = sel || fm.selected();
					sel = this.files(sel);

					cnt = sel.length;
					if (cnt < 1) {
						return -1;
					}

					var hasDir = false;
					var hasFile = false;
					for(i=0;i<cnt;i++)
					{
						if(sel[i].dirs==1){
							hasDir = true;
						}else{
							hasFile = true;
						}
					}

					if(hasDir&&hasFile){
						return -1;
					}

					// Rule 1 and 2 exclude itself. By this I mean that rule nr 2
					// takes precedence over rule nr 1, so you just need to check
					// if the selected hash is a root folder.
					result=0;

					return result;
				}
			}

	elFinder.prototype.i18.en.messages['cmduploadcustom'] = '上传文件';
	elFinder.prototype._options.commands.push('uploadcustom');
	elFinder.prototype.commands.uploadcustom = function() {
				var self  = this,
				fm    = self.fm;
				this.exec = function(hashes) {
					var dirId = $('#elfinder')[0].elfinder.cwd().hash.split("_")[0];
//						window.open("/task/ziliao/uploadview/?uploaddir="+dirId);
					window.open("/task/ziliao/addFile/?uploaddir="+dirId);
				}
				this.getstate = function(sel) {
					//return 0 to enable, -1 to disable icon access
					var fm = this.fm;
					var sel = sel || fm.selected();
					sel = this.files(sel);

					cnt = sel.length;
					if (cnt != 1) {
						return -1;
					}

					for(i=0;i<cnt;i++)
					{
						if(sel[i].dirs==1){
							if(sel[i].write==1){
								return 0;
							}else{
								return -1;
							}

						}else{
							return -1;
						}

					}
					result=-1;

					return result;
				}
			}

	elFinder.prototype.i18.en.messages['cmdhisversion'] = '查看文件详情';
	elFinder.prototype._options.commands.push('hisversion');
	elFinder.prototype.commands.hisversion = function() {
			var self  = this,
			fm    = self.fm;
			this.exec = function(hashes) {
				var fileId = hashes[0].split("_")[0];
				//window.open("/task/ziliao/filehisversion/?fileId="+fileId);
				window.open("/task/ziliao/fileContent/?docId="+fileId);
			}
			this.getstate = function(sel) {
				//return 0 to enable, -1 to disable icon access

				// Rule 1 and 2 exclude itself. By this I mean that rule nr 2
				// takes precedence over rule nr 1, so you just need to check
				// if the selected hash is a root folder.
				var fm = this.fm;
				var sel = sel || fm.selected();
				sel = this.files(sel);

				cnt = sel.length;
				if (cnt != 1) {
					return -1;
				}

				for(i=0;i<cnt;i++)
				{
					if(sel[i].dirs==1)
						return -1;
				}

				result=0;

				return result;
			}
		}

	// 修改关联元素
	elFinder.prototype.i18.en.messages['cmdeditmessage'] = '更新文件';
	elFinder.prototype._options.commands.push('editmessage');
	elFinder.prototype.commands.editmessage = function() {
					var self  = this,
					fm    = self.fm;
					this.exec = function(hashes) {
						var fileId = hashes[0].split("_")[0];
						//edit_content( fileId );
						window.open("/task/ziliao/updataFile/?docId="+fileId);
					}
					this.getstate = function(sel) {
						//return 0 to enable, -1 to disable icon access
						// Rule 1 and 2 exclude itself. By this I mean that rule nr 2
						// takes precedence over rule nr 1, so you just need to check
						// if the selected hash is a root folder.
						var fm = this.fm;
						var sel = sel || fm.selected();
						sel = this.files(sel);

						cnt = sel.length;
						if (cnt != 1) {
							return -1;
						}

						for(i=0;i<cnt;i++)
						{
							if(sel[i].dirs==1)
								return -1;
						}

						result=0;

						return result;
					}
				}
	function edit_content( fileId ) {
		 zeroModal.show({
				title: '修改信息',
				iframe: true,
				url: '/task/ziliao/editproperty/?fileId='+fileId,
				width: '80%',
				height: '80%'
			});
	}

	elFinder.prototype.i18.en.messages['cmdpreview'] = '查看图纸';
	elFinder.prototype._options.commands.push('preview');
	elFinder.prototype.commands.preview = function() {
			var self  = this,
			fm    = self.fm;
			this.exec = function(hashes) {
				var fileId = hashes[0].split("_")[0];
				window.open("/task/ziliao/previewfile/?fileId="+fileId);
			}
			this.getstate = function(sel) {
				//return 0 to enable, -1 to disable icon access

				// Rule 1 and 2 exclude itself. By this I mean that rule nr 2
				// takes precedence over rule nr 1, so you just need to check
				// if the selected hash is a root folder.
				var fm = this.fm;
				var sel = sel || fm.selected();
				sel = this.files(sel);

				cnt = sel.length;
				if (cnt != 1) {
					return -1;
				}

				for(i=0;i<cnt;i++)
				{
					if(sel[i].dirs==1)
						return -1;
				}

				if(sel[0].mime!="application/dwg")
					return -1;

				result=0;

				return result;
			}
		}

    elFinder.prototype.i18.en.messages['cmdrmfile'] = '删除';
    elFinder.prototype._options.commands.push('rmfile');
    elFinder.prototype.commands.rmfile = function() {
        let self  = this,
            fm    = self.fm;
        this.exec = function(hashes) {
        	
        	console.log(hashes);
        	let delType = hashes[0].split("_")[1];
        	if("dir"==delType){
        		  $.ajax({
                    url: `/task/ziliao/connector/`,
                    type: 'get',
                    dataType: 'json',
                    data:{
                        cmd: 'rm',
                        targets: [hashes[0]],
                        _: new Date().getTime()
                    },
                    success: (data) => {
                       if(data.error){
                       		alert(data.error);
                       }else{
                       	    if(data.removed.length !== 0){
	                           $(".ui-state-disabled").removeClass("ui-state-disabled")
	                           $(".elfinder-button-icon-reload").click();
						   }
                       }

                    }
                });
        	}else{
          		let fileId = hashes[0].split("_")[0];
	            $.ajax({
					url: '/task/ziliao/checkedfile/',
					dataType: 'json',
					type: 'get',
					data: {
	                    fileIdList: JSON.stringify([parseInt(fileId)])
	                },
					success: (data)=> {
						if(data.res){
	                        if(data.results.length == 0){
	                            //可直接删除
	                            deleteFile(fileId, 0);
	                        }else {
	                            //发起删除-审核流程
	                            deleteFile(fileId, 1);
	                        }
						}else {
							alert(data.error);
						}
					}
				});
        	}
        	

        }
        this.getstate = function(sel) {
            //return 0 to enable, -1 to disable icon access
            // Rule 1 and 2 exclude itself. By this I mean that rule nr 2
            // takes precedence over rule nr 1, so you just need to check
            // if the selected hash is a root folder.
            var fm = this.fm;
            var sel = sel || fm.selected();
            sel = this.files(sel);
			console.log(sel);
			
            cnt = sel.length;
            if (cnt != 1) {
                return -1;
            }

            for(i=0;i<cnt;i++)
            {
                if(sel[i].write==0)
                    return -1;
            }

            result=0;

            return result;
        }
    }
    function deleteFile( fileId, need ) {
        let Temp = '该文件上传时间超过24小时，删除该文件必须发起删除审批流程，审批通过后自动删除该文件，确定发起吗？';
        if(!need){
            Temp = '该操作不可撤销!';
		}
        zeroModal.show({
            title: '温馨提示',
           	content: Temp,
            width: '320px',
            height: '200px',
            cancel: true,
            cancelTitle: '取消',
            ok: true,
			okFn () {
                $.ajax({
                    url: `/task/ziliao/connector/`,
                    type: 'get',
                    dataType: 'json',
                    data:{
                        cmd: 'rm',
                        targets: [`${fileId}_file`],
                        _: new Date().getTime()
                    },
                    success: (data) => {
                       if(data.removed.length !== 0){
                           $(".ui-state-disabled").removeClass("ui-state-disabled")
                           $(".elfinder-button-icon-reload").click();
					   }else {
                       		alert('删除审核发起成功');
					   }
                    }
                });
			}
        });
    }

	var startPathHash = $("#startPathHash").val();
	var rememberLastDir = false;
	if($("#startPathHash").val()){
		rememberLastDir = false;
	}
	$('#elfinder').elfinder({
					url : '/task/ziliao/connector/',  // connector URL (REQUIRED)
					lang: 'zh_CN',                    // language (OPTIONAL)
					urlUpload:'/task/ziliao/connector_upload/',
					height:height,
					rememberLastDir:rememberLastDir,
					startPathHash : startPathHash,
			    uiOptions: {
					// toolbar configuration
							toolbar : [
							['back', 'forward'],
							['home','reload'],
							['mkdir', 'uploadcustom'],
							['open', 'downloadcustom', 'getfile'],
							['info' ], //'quicklook'
							['copy', 'cut', 'paste'],
							// ['rm'], 隐藏工具条的删除按钮
							['duplicate', 'rename'],
							['view', 'sort'],
							// ['search'],
							// extra options
							{
								// auto hide on initial open
								autoHideUA: ['Mobile']
							}
						],
					cwd : {
								// display parent folder with ".." name :)
								oldSchool : false,
								
								// fm.UA types array to show item select checkboxes e.g. ['All'] or ['Mobile'] etc. default: ['Touch']
								showSelectCheckboxUA : ['Touch'],
								
								// file info columns displayed
								listView : {
									// name is always displayed, cols are ordered
									// e.g. ['perm', 'date', 'size', 'kind', 'owner', 'group', 'mode']
									// mode: 'mode'(by `fileModeStyle` setting), 'modestr'(rwxr-xr-x) , 'modeoct'(755), 'modeboth'(rwxr-xr-x (755))
									// 'owner', 'group' and 'mode', It's necessary set volume driver option "statOwner" to `true`
									columns : ['date', 'remark','size', 'kind'],
									// override this if you want custom columns name
									// example
									// columnsCustomName : {
									//		date : 'Last modification',
									// 		kind : 'Mime type'
									// }
									columnsCustomName : {
										
								  },
									// fixed list header colmun
									fixedHeader : true
								}
							},	
						},
                        //commands --> 'rm', delete键盘删除功能
						commands : [
							'custom','open', 'opendir', 'reload', 'home', 'up', 'back', 'forward', 'getfile', 'quicklook', 
							'downloadcustom', 'mkdir', 'mkfile', 'uploadcustom', 'copy',
							'cut', 'paste', 'edit', 'extract', 'archive', 'search', 'info', 'view', 'help',
							'resize', 'sort', 'places', 'chmod','zipdl','hisversion','editmessage','preview', 'rmfile', 'rename'
						],
					contextmenu : {
							// navbarfolder menu
							navbar : ['open', 'downloadcustom', '|', 'uploadcustom', '|', 'copy', 'cut', 'paste', '|', 'rm', '|', 'rename', '|', 'archive', '|', 'places', 'info', 'chmod', 'netunmount'],
							// current directory menu
							cwd    : ['reload', 'back', '|', 'uploadcustom', 'mkdir', 'mkfile', 'paste', '|', 'sort', '|', 'info'],
							// current directory file menu
        					// files --> , 'rm' 自带删除
							files  : ['getfile', '|' ,'custom','open', 'downloadcustom', 'opendir', 'hisversion', 'editmessage','|', 'uploadcustom', 'mkdir', '|', 'copy', 'cut', 'paste', 'rmfile', '|','rename','|', 'info', 'chmod']
						},

				});
});




