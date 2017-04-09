jQuery.fn.extend({
	keyboard: function(params) {
		var self = {};
		self.target = null;

		if(typeof(params.target) != 'undefined'){
			self.target = $(params.target);
		}else{
			self.target = $($(this).data('target'));
		}

		if(self.target == null){
			console.error("Keyboard Error: Nenhum elemento alvo foi definido");
			return;
		}

		if(typeof(params.defaultFont) != 'undefined'){
			self.defaultFont = "Arial";
		}else{
			self.defaultFont = params.defaultFont;
		}

		$(this).addClass("keyboard");
		var container = $("<div />");
		container.addClass("keyboard-container");

		if(typeof(params.fonts) == 'object'){
			self.mainFont = params.fonts[0].name;

			if(params.selector == true && params.fonts.length > 1){
				var selectorContainer = $("<ul id='keyboard_selector' />");
				selectorContainer.addClass("nav nav-pills nav-justified");
				for(index in params.fonts){
					var link = $("<a href='#' />");
					link.data('font', params.fonts[index].name);
					link.text(params.fonts[index].label);
					link.addClass("nav-link");
					link.on('click', function(e){
						e.preventDefault();
						if(!$(this).hasClass("active")){
							$(this).parents('.nav').find(".active").removeClass("active");
							$(this).addClass("active");
							self.mainFont = $(this).data('font');

							$(this).parents(".keyboard").find(".keyboard-container button").css("font-family", self.mainFont);
							$(this).parents(".keyboard").find(".keyboard-container .key .help-block").css("font-family", self.defaultFont);
						}
					});
					var listItem = $("<li />").append(link)
					selectorContainer.append(listItem);

				}
				$(this).append(selectorContainer);
			}
			
			if(params.toggle == true && params.fonts.length >= 1){
				var btnSwitchContainer = $("<div class='contaier' />");
				var btnSwitch = $("<button />");
				btnSwitch.addClass("btn pull-right");
				btnSwitch.text("Alterar fonte (tab)");

				btnSwitch.on("click", function(){
					var currentFont = $(this).parents(".keyboard").find(".keyboard-container button").css("font-family");

					var bigFont = self.defaultFont;
					var smallFont = self.mainFont;
					if(currentFont == self.defaultFont){
						bigFont = self.mainFont;
						smallFont = self.defaultFont;
					}

					$(this).parents(".keyboard").find(".keyboard-container button").css("font-family", bigFont);
					$(this).parents(".keyboard").find(".keyboard-container .key .help-block").css("font-family", smallFont);
				});

				$(document).on('keydown', function(e){
					var keyCode = e.keyCode || e.which; 

					if (keyCode == 9) { 
						e.preventDefault(); 
						btnSwitch.trigger('click');
					}
				});

				btnSwitchContainer.append(btnSwitch);
				$(this).append(btnSwitchContainer);
			}			
		}

			/* Lista de teclas QWERTY */
		var keys = [
			['q','w','e','r','t','y','u','i','o','p'],
			['a','s','d','f','g','h','j','k','l','ç'],
			['z','x','c','v','b','n','m']
		];


		var maxKeysPerRow = 0; /* Quantidade de teclas na linha (serve para centralizar teclas */
		for(var row = 0; row < keys.length; row++){
			var keyboardRow = $("<div>");
			keyboardRow.addClass('keyboard-row');

			/* Se o número de teclas na linha for menor, calcula quantas terá de pular */
			var skip = 0
			if(maxKeysPerRow < keys[row].length){
				maxKeysPerRow = keys[row].length;
			}else{
				skip = Math.floor(((maxKeysPerRow - keys[row].length) / 2));
			}

			for(var skipCount = 0; skipCount <= skip; skipCount++){
				var keySkip = $("<div />");
				keySkip.addClass("keyWrap skip");
				keyboardRow.append(keySkip);
			}

			/* Imprimindo as teclas do alfabeto */
			for(var key = 0; key < keys[row].length; key++){
				var keyLetter = keys[row][key];
				var buttonWrap = $("<div />");
				buttonWrap.addClass("keyWrap text-center");

				var button = $("<button />");
				button.addClass("btn key");
				button.text(keyLetter).val(keyLetter).css("font-family", self.mainFont);
				if(params.showBoth == true){
					var originalFont = $("<span />");
					originalFont.addClass("help-block");
					originalFont.text(keyLetter);
					button.append(originalFont);
				}

				buttonWrap.append(button);
				keyboardRow.append(buttonWrap);

			}

			container.append(keyboardRow);
		}

		/* Adicionando barra de espaço */
		var spaceBarRow = $("<div>");
		spaceBarRow.addClass('keyboard-row spacebar');
		var spaceBarKey = $("<button />");
		spaceBarKey.addClass('btn key');
		spaceBarKey.val(" ");
		var buttonWrap = $("<div />");
		buttonWrap.addClass("keyWrap spacebar");
		buttonWrap.append(spaceBarKey);
		spaceBarRow.append(buttonWrap);
		container.append(spaceBarRow);


		$(this).append(container);

		$(this).find("button.key").on("click", function(event){
			var text = self.target.val() + $(this).val();
			self.target.val(text);
		});
	}
});