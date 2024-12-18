$( document ).ready(async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;
    const language = await getLanguageData(config?.lang);
    const server = await getServerData();
    if(!server) return;
    await createSettingsPanel(config, language, server);

    if(window?.location?.href?.includes('/#keydrop_plus'))
        $('div#keydrop-plus-modal')?.addClass('is-open');

    $('#keydrop-plus-modal').click(function(e) {
        if(e?.target?.id == 'close-keydrop-plus-modal' || e?.target?.id == "keydrop-plus-modal")
            $('#keydrop-plus-modal')
                .removeClass('is-open');
    });

    if(config?.toastSoundEnable_error)
        $('#toastSoundEnable_error')?.prop('checked', true);
    $('#toastSoundEnable_error')?.on('change', function(e) {
        config.toastSoundEnable_error = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); } catch(e) {};
    });

    if(config?.toastSoundEnable_info)
        $('#toastSoundEnable_info')?.prop('checked', true);
    $('#toastSoundEnable_info')?.on('change', function(e) {
        config.toastSoundEnable_info = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); } catch(e) {};
    });

    if(config?.toastSoundEnable_success)
        $('#toastSoundEnable_success')?.prop('checked', true);
    $('#toastSoundEnable_success')?.on('change', function(e) {
        config.toastSoundEnable_success = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); } catch(e) {};
    });

    if(config?.toastSoundEnable_warning)
        $('#toastSoundEnable_warning')?.prop('checked', true);
    $('#toastSoundEnable_warning')?.on('change', function(e) {
        config.toastSoundEnable_warning = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); } catch(e) {};
    });

    if(config?.toastAutoHide)
        $('#hideToast')?.prop('checked', true);
    $('#hideToast')?.on('change', function(e) {
        config.toastAutoHide = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); } catch(e) {};
    });

    if(config?.showAllYoutuberCases)
        $('#showAllYoutuberCases')?.prop('checked', true);
    $('#showAllYoutuberCases')?.on('change', function(e) {
        $('.keydrop-plus-ytcases').css('display', e?.target?.checked ? 'block' : 'none');
        $('[case-orginal="true"').css('display', e?.target?.checked ? 'none' : 'block');
        config.showAllYoutuberCases = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); } catch(e) {};
    });

    if(config?.hideLiveDrop) {
        $('#hideLiveDrop')?.prop('checked', true);
        waitForElm('div.flex.flex-col.overflow-hidden.bg-navy-900.lg\\:flex-row').then(() => {
            if(config?.hideLiveDrop)
                $('div.flex.flex-col.overflow-hidden.bg-navy-900.lg\\:flex-row')?.eq(0)?.css('display', 'none');
        });
    }
    $('#hideLiveDrop')?.on('change', function(e) {
        config.hideLiveDrop = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); } catch(e) {};
        $('div.flex.flex-col.overflow-hidden.bg-navy-900.lg\\:flex-row')?.eq(0)?.css('display', e?.target?.checked ? 'none' : 'flex');
    });

    if(config?.hideCaseBattle) {
        $('#hideCaseBattle')?.prop('checked', true);
        waitForElm('[data-testid="single-bttl-rounds-counter"]').then(() => {
            if(!config?.hideCaseBattle)
                return;
            $('div#caseList-root div.container.mb-8')?.eq(0)?.css('display', 'none');
            $('div#caseList-root div.mx-auto.max-w-screen-2xl.2xl\\:px-5')?.eq(0)?.css('margin-top', '50px');
        });
    }
    $('#hideCaseBattle')?.on('change', function(e) {
        config.hideCaseBattle = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); } catch(e) {};
        $('div#caseList-root div.container.mb-8')?.eq(0)?.css('display', e?.target?.checked ? 'none' : 'block');
        $('div#caseList-root div.mx-auto.max-w-screen-2xl.2xl\\:px-5')?.eq(0)?.css('margin-top', e?.target?.checked ? '50px' : '0px');
    });

    if(config?.hideFavourite) {
        $('#hideFavourite')?.prop('checked', true);
        $('section#favorite')?.css('display', 'none');
    }
    $('#hideFavourite')?.on('change', function(e) {
        config.hideFavourite = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); } catch(e) {};
        $('section#favorite')?.css('display', e?.target?.checked ? 'none' : 'block');
    });

    $('#keydrop-plus-remove-data')?.on('click', function(e) {
        try { chrome.storage.sync.clear(); } catch(e) {};
        setTimeout(async() => {
            try { chrome.storage.local.clear(); } catch(e) {};
            window?.location?.reload();
        }, 200);
    });

    if(config?.showJokerOdds) {
        $('#showJokerOdds')?.prop('checked', true);
    }
    $('#showJokerOdds')?.on('change', async(e) => {
        const config = await getConfigData();
        const casesFetch = await fetchUrl('GET', `${githubUrl}/cases.json`)
        if(!casesFetch || !config) return;
        const cases = JSON.parse(`{"cases": ${casesFetch}}`)?.cases;
        if(!cases?.length) return;

        config.showJokerOdds = e?.target?.checked;
        try { chrome.storage.sync.set({ config: config }); refreshOdds(config, cases); } catch(e) {};
    });

    $(`.keydorp-plus-change-language[data-lang="${config?.lang}"]`)
        ?.css('filter', 'opacity(0.8)');

    $('.keydorp-plus-change-language')?.click(function() {
        const lnagData = $(this)?.attr('data-lang');
        config.lang = lnagData;
        try{  chrome.storage.sync.set({ config: config }) } catch(e) {};
        window?.location?.reload();
    });
});

const createSettingsPanel = async(config, language, server) => {
    const languageText = {
        hiddenPanels: language?.settingsPanel_hiddenPanels,
        livedrop: language?.settingsPanel_livedrop,
        caseBattle: language?.settingsPanel_caseBattle,
        favouriteCases: language?.settingsPanel_favouriteCases,
        enabledPanels: language?.settingsPanel_enabledPanels,
        hideToast: language?.settingsPanel_hideToast,
        allYTCases: language?.settingsPanel_allYTCases,
        voiceToast: language?.settingsPanel_voiceToast,
        errorToast: language?.settingsPanel_errorToast,
        infoToast: language?.settingsPanel_infoToast,
        successToast: language?.settingsPanel_successToast,
        warningToast: language?.settingsPanel_warningToast,
        version: language?.settingsPanel_version,
        deleteData: language?.settingsPanel_deleteData,
        support: language?.settingsPanel_support,
        keydrop: language?.settingsPanel_keydrop,
        kick: language?.settingsPanel_kick,
        help: language?.settingsPanel_help,
        discord: language?.settingsPanel_discord,
        findBug: language?.settingsPanel_findBug,
        by: language?.settingsPanel_by,
        joker: language?.settingsPanel_joker,
    };

    const versionNumber = config?.version?.slice(1);

    $('#app-root')?.before($(document.createElement('div'))
        ?.attr({ 'id': 'keydrop-plus-modal', 'aria-hidden': 'false' })
        ?.addClass('flex h-fit max-h-full w-full flex-col space-y-2 rounded-2xl bg-navy-800 md:space-y-0.5')
        ?.css({ 'z-index': 99, position: 'fixed', background: 'rgb(8 10 13 / 90%)', height: '100%' })
        ?.html(`<div id="close-keydrop-plus-modal" tabindex="-1" class="px-5 modal__overlay"><div id="keydrop-plus-root"><div class="modal__container" style="display: table-header-group;background: none;margin-left: calc(50% - 575px);position: absolute;margin-top: 11%;"><div style="width: 700px;float: left;"><div class="relative grid"><button class="absolute top-0 right-0 z-10 p-6 text-lg leading-none transition-all duration-200 transform rounded-lg opacity-75 hover:opacity-100 hover:scale-125 will-change" id="close-keydrop-plus-modal">✕</button><div style="border: 1px solid #5d5e81a8" class="absolute top-0 left-0 w-full h-full border border-solid rounded-xl bg-navy-700 transition duration-300"></div><div class="relative flex flex-col items-center justify-center col-start-1 row-start-1 px-10 py-5 text-center transition-opacity duration-500 md:px-20" style="opacity: 1; pointer-events: all;"><img src="${await changeLogo()}" alt="KeyDrop2" class="block" style="filter: opacity(1);scale: 2;margin: 8px;"><p class="text-sm font-medium leading-snug text-navy-200" style="margin: 35px 0px -10px 0px;font-size: 17px;">${languageText?.hiddenPanels}</p><div style="margin-top: 40px;"><input class="keydorop-show-menu" id="hideLiveDrop" type="checkbox"><label for="hideLiveDrop" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-8 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); border-radius: 20px 0px 0px 20px; margin-right: 0px;">${languageText?.livedrop}</label><input class="keydorop-show-menu" id="hideCaseBattle" type="checkbox"><label for="hideCaseBattle" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-4 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); margin-right: 0px;">${languageText?.caseBattle}</label><input class="keydorop-show-menu" id="hideFavourite" type="checkbox"><label for="hideFavourite" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-4 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); border-radius: 0px 20px 20px 0px; margin-right: 0px;">${languageText?.favouriteCases}</label></div><p class="text-sm font-medium leading-snug text-navy-200" style="margin: 40px 0px -10px 0px;font-size: 17px;">${languageText?.enabledPanels}</p><div style="margin-top: 40px;"><input class="keydorop-show-menu" id="hideToast" type="checkbox"><label for="hideToast" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-8 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); border-radius: 20px 0px 0px 20px; margin-right: 0px;">${languageText?.hideToast}</label><input class="keydorop-show-menu" id="showJokerOdds" type="checkbox"><label for="showJokerOdds" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-4 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); margin-right: 0px;">${languageText?.joker}</label><input class="keydorop-show-menu" id="showAllYoutuberCases" type="checkbox"><label for="showAllYoutuberCases" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-4 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); border-radius: 0px 20px 20px 0px; margin-right: 0px;">${languageText?.allYTCases}</label></div><p class="text-sm font-medium leading-snug text-navy-200" style="margin: 40px 0px -10px 0px;font-size: 17px;">${languageText?.voiceToast}</p><div style="margin-top: 40px;"><input class="keydorop-show-menu" id="toastSoundEnable_error" type="checkbox"><label for="toastSoundEnable_error" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-8 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); border-radius: 20px 0px 0px 20px; margin-right: 0px;">${languageText?.errorToast}</label><input class="keydorop-show-menu" id="toastSoundEnable_info" type="checkbox"><label for="toastSoundEnable_info" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-4 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); margin-right: 0px;">${languageText?.infoToast}</label><input class="keydorop-show-menu" id="toastSoundEnable_success" type="checkbox"><label for="toastSoundEnable_success" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-4 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); margin-right: 0px;">${languageText?.successToast}</label><input class="keydorop-show-menu" id="toastSoundEnable_warning" type="checkbox"><label for="toastSoundEnable_warning" class="cursor-pointer items-center text-center p-4 font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 hover:text-white hover:bg-navy-600 mt-4 text-base leading-snug uppercase" style="color: rgb(180, 184, 205); border-radius: 0px 20px 20px 0px; margin-right: 0px;">${languageText?.warningToast}</label></div><p class="mt-8 text-base font-bold leading-snug uppercase text-gold-400">${languageText?.version}: <a class="text-white">${versionNumber || '0'}</a></p><div style="margin-left: auto;"><button id="keydrop-plus-remove-data" class="text-sm font-medium leading-snug text-red" style="margin-left: 12px; padding: 7px; border-radius: 7px; background-color: rgb(44, 27, 27);">${languageText?.deleteData}</button></div></div></div></div><div class="pt-6 pb-3 bg-navy-700" style="width: 450px;border-radius: 17px;border: 1px solid #5d5e81a8;float: left;height: 546.1px;"><h3 class="mb-3 text-xl font-bold text-center uppercase">${languageText?.support}</h3><div class="overflow-auto scroll-container custom-scrollbar css-nqdl3y"><table class="w-full text-xs leading-none table-fixed text-navy-200 css-s83462"><thead class="text-left uppercase"><tr class="odd:bg-navy-800"><td class="text-center" style="margin-left: 34px;display: block;"><a href="https://key-drop.com/?code=juzlus" target="_blank"><img src="https://csgoradar.com/wp-content/uploads/2022/07/keydrop-csgo-gambling.png" style="height: 75px;margin-left: 21px;" alt="Keydrop Logo"></a></td><td class="px-2 py-4 text-center">${languageText?.keydrop}</td></tr><tr class="odd:bg-navy-800"><td class="py-4 text-center" style="display: block;margin-left: 35.5px;"><a href="https://buycoffee.to/juzlus" target="_blank"><img src="https://buycoffee.to/btn/buycoffeeto-btn-primary-outline.svg" style="width: 173px" alt="Postaw mi kawę na buycoffee.to"></a></td><td class="px-2 py-4 text-center">buycoffeeme.to</td></tr><tr class="odd:bg-navy-800"><td class="py-4 text-center" style="display: block;margin-left: 35.5px;"><a href="https://buymeacoffee.com/juzlus" target="_blank"><img src="https://camo.githubusercontent.com/d7f6f34bc2529917647b5d66dbd8a4c07428ef0e2841353cbedb59e3b39204fe/68747470733a2f2f7777772e636f646568696d2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323032322f30392f626d632d627574746f6e2d363430783138302e706e67" style="width: 173px" alt="Buy me a coffee on buymeacoffee.to"></a></td><td class="px-2 py-4 text-center">buymeacoffee</td></tr></thead></table></div><h3 class="mt-6 mb-3 text-xl font-bold text-center uppercase">${languageText?.help}</h3><div class="overflow-auto scroll-container custom-scrollbar css-nqdl3y"><table class="w-full text-xs leading-none table-fixed text-navy-200 css-s83462"><thead class="text-left uppercase"><tr class="odd:bg-navy-800"><td class="py-4 text-center" style="display: block;margin-left: 35.5px;"><a href="https://github.com/Juzlus/KeydropPlus" target="_blank" style="text-align: -webkit-center;"><img src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Emblem.png" style="background: #e3e3e3;width: 120px;border-radius: 15px;scale: 1;padding: 0 20px;margin-right: 15px;margin-top: 2px;" alt="Github source"></a></td><td class="px-2 py-4 text-center">Github</td></tr><tr class="odd:bg-navy-800" style="border-bottom: none"><td class="py-4 text-center" style="display: block;margin-left: 35.5px;"><a href="https://forms.gle/v39v9Q2zt329ojg79" target="_blank"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8b466e9f-26b4-4f40-a5ff-7eaa4b314014/dfbawam-c2e3d14d-69ac-43b8-a118-3ab6d0f9dc04.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhiNDY2ZTlmLTI2YjQtNGY0MC1hNWZmLTdlYWE0YjMxNDAxNFwvZGZiYXdhbS1jMmUzZDE0ZC02OWFjLTQzYjgtYTExOC0zYWI2ZDBmOWRjMDQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.zuVmrOZ6ztQ9WMkAwQ6pVEaNBjoHQBOBLYCCoJaXT-0" style="background: #e3e3e3;width: 173px;border-radius: 25px;scale: 0.76;" alt="Google forms"></a></td><td class="px-2 py-4 text-center">${languageText?.findBug}</td></tr></thead></table></div></div></div></div></div>`)
    );

    server?.languages?.forEach(el => {
        $("#keydrop-plus-remove-data").before($(document.createElement('div'))
            .css({ display: "inline-table", width: "65px" })
            .html(`<img class="keydorp-plus-change-language text-sm font-medium leading-snug text-red" data-lang="${el?.langFileName}" src="${el?.langImg}" style="height: 34px;filter: opacity(0.5);display: inline-block;cursor: pointer;"><p style="text-align: center;font-size: 9px;color: rgb(152 158 187/var(--tw-text-opacity));">${el?.langBy != null ? `${languageText?.by} ${el?.langBy}` : ""}</p>`)
        ); 
    });
};