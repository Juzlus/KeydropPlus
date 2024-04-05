let gamesMaxNonce = 5;
let gamesClientSeed = '';
let gamesServerSeed = '';
const gamesAvailableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function createGamesCaseDropMenu(dropList, languageText, casePrice) {
    for(let j = 0; j < 32; j++)
        gamesServerSeed += gamesAvailableChars[Math?.floor(Math?.random() * gamesAvailableChars?.length)];
        
    gamesClientSeed = $('.flex-1.max-w-xs.pl-3.-mr-6.text-xs.font-semibold.text-white.transition-colors.duration-150').val() || gamesServerSeed?.slice(5, 13);
    createGamesCaseDropSelection(languageText);
    getGamesCaseDrop(dropList, casePrice, languageText);

    $('#keydrop-plus-client-seed').blur(async(e) => {
        gamesClientSeed = e.target.value;
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('#keydrop-plus-server-seed').blur(async(e) => {
        gamesServerSeed = e.target.value;
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('input[value="server seed"]').on('click', async(e) => {
        gamesServerSeed = '';
        for(let j = 0; j < 32; j++)
            gamesServerSeed += gamesAvailableChars[Math?.floor(Math?.random() * gamesAvailableChars?.length)];
        $('#keydrop-plus-server-seed').val(gamesServerSeed);
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('input[value="client seed"]').on('click', async() => {
        gamesClientSeed = '';
        for(let j = 0; j < 8; j++)
        gamesClientSeed += gamesAvailableChars[Math?.floor(Math?.random() * gamesAvailableChars?.length)];
        $('#keydrop-plus-client-seed').val(gamesClientSeed);
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('#keydrop-plus-select-nonce-6').on('click', async() => {
        gamesMaxNonce = 5;
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('#keydrop-plus-select-nonce-12').on('click', async() => {
        gamesMaxNonce = 11;
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('#keydrop-plus-select-nonce-18').on('click', async() => {
        gamesMaxNonce = 17;
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('#keydrop-plus-select-nonce-24').on('click', async() => {
        gamesMaxNonce = 23;
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('#keydrop-plus-select-nonce-30').on('click', async() => {
        gamesMaxNonce = 29;
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('#keydrop-plus-select-nonce-36').on('click', async() => {
        gamesMaxNonce = 35;
        getGamesCaseDrop(dropList, casePrice, languageText);
    });

    $('#keydrop-plus-select-nonce-42').on('click', async() => {
        gamesMaxNonce = 41;
        getGamesCaseDrop(dropList, casePrice, languageText);
    });
};

const getGamesCaseDrop = async(dropList, casePrice, languageText) => {
    const itemDrops = [];
    let skinsSum = 0;

    for(i=0; i<=gamesMaxNonce; i++) {
        const hash = CryptoJS.HmacSHA512(gamesServerSeed, `${gamesClientSeed}-${i}`);
        const partHash = hash.toString().slice(0, 15);
        const dec = convertBase(partHash, 16, 10);
        const roll = checkIBAN(dec)+1;
        const drop = dropList?.filter(item => {
            return (roll >= item?.intervalFrom && roll <= item?.intervalTo)
        });
        skinsSum += parseFloat(drop[0]?.price);
        itemDrops.push(drop[0]);
    }

    const currency = await getCurrency();
    $('#caseDropCaseCount')?.text(gamesMaxNonce+1);
    $('#caseDropCaseSum')?.text(`${(casePrice * (gamesMaxNonce+1))?.toFixed(2)} ${currency}`);
    $('#caseDropSkinsSum')?.text(`${(skinsSum)?.toFixed(2)} ${currency}`);
    $('#caseDropProfit')?.text(`${((skinsSum) - (casePrice * (gamesMaxNonce+1)))?.toFixed(2)} ${currency}`);
    createGamesCaseItemList(itemDrops, languageText, currency);
};

const createGamesCaseDropSelection = async(languageText) => {
    $('#caseInfoPanel')
        ?.after($(document.createElement('selection'))
            ?.attr({ id: 'keydrop-plus-free-open' })
            ?.html(`<div id="keydrop-plus-list" class="flex flex-col items-center grid-cols-3 space-y-4 border-b border-solid md:space-y-0 md:items-start md:grid border-navy-500"><div class="order-1 flex items-center space-x-4"></div><h2 class="order-3 inline-block px-10 py-5 mx-auto -mb-px text-xl font-semibold leading-tight text-center text-white uppercase border-b border-solid md:order-2 border-gold" style="margin-top: auto;">${languageText?.testDrops}</h2><form class="flex justify-end order-2 md:order-3" style="display: inline; margin-left: auto;"><input id="keydrop-plus-client-seed" value="${gamesClientSeed}" minlength="3" size="38" maxlength="32" pattern="[a-zA-Z0-9]+" required="required" class="max-w-xs pl-3 -mr-6 p-2 text-xs font-semibold text-white transition-colors duration-150 bg-transparent border border-solid rounded-md border-navy-500 focus:border-navy-400 placeholder-navy-300 focus:outline-none"><input type="button" value="client seed" class="disabled items-center w-30 h-10 px-4 text-xs font-bold leading-none uppercase transition-colors duration-150 border border-solid rounded-md hover:text-white hover:bg-navy-550 bg-navy-600 whitespace-nowrap grid-stack disabled:pointer-events-none border-navy-300" style="user-select: none; cursor: pointer;"><br><input id="keydrop-plus-server-seed" value="${gamesServerSeed}" minlength="32" size="38" maxlength="32" pattern="[a-zA-Z0-9]+" required="required" class="max-w-xs mt-4 mb-6 pl-3 -mr-6 p-2 text-xs font-semibold text-white transition-colors duration-150 bg-transparent border border-solid rounded-md border-navy-500 focus:border-navy-400 placeholder-navy-300 focus:outline-none"><input type="button" value="server seed" class="disabled items-center w-30 h-10 px-4 text-xs font-bold leading-none uppercase transition-colors duration-150 border border-solid rounded-md hover:text-white hover:bg-navy-550 bg-navy-600 whitespace-nowrap grid-stack disabled:pointer-events-none border-navy-300" style="user-select: none; cursor: pointer;"></form></div><ul id="keydrop-plus-drops-list" class="grid mt-8 mb-8 gap-2 css-a27jap"></ul><div style="text-align: center;margin-bottom: 14px;margin-top: -14px;"><span class="text-xs font-semibold uppercase leading-snug text-navy-300" style="margin-top: 32px;color: rgb(128 132 158);font-size: 12px;">${languageText?.caseCount}: <a style="color: rgb(106 109 129);margin-right: 20px;" id="caseDropCaseCount">0</a>${languageText?.caseSum}: <a style="color: rgb(106 109 129);margin-right: 20px;" id="caseDropCaseSum">0</a>${languageText?.skinsSum}: <a style="color: rgb(106 109 129);margin-right: 20px;" id="caseDropSkinsSum">0</a>${`${languageText?.profit}: <a style="color: rgb(106 109 129);" id="caseDropProfit">0</a>`}</span></div><div class="relative flex h-10 sm:h-15 mb-20"><label style="text-align: center; margin-left: auto;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 rounded-l sm:rounded-l-lg ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" checked="checked" id="keydrop-plus-select-nonce-6" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">6</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-12" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">12</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-18" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">18</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-24" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">24</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-30" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">30</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-36" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">36</p></label><label style="text-align: center; margin-right: auto;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 rounded-r sm:rounded-r-lg ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-42" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">42</p></label></div>`)
        );
};

const createGamesCaseItemList = async(itemDrops, languageText, currency) => {
    $('#keydrop-plus-drops-list')?.html('');
    itemDrops?.forEach((el, nonce) => {
        const coverColor = `${el?.color != null ? `css-${el.color}` : 'css-gray'}`;
        $('#keydrop-plus-drops-list')?.append($(document.createElement('li'))
            ?.addClass('css-ik2bl7 freeOpen')
            ?.html(`<div title="${el?.title}" class="group relative mt-px grid aspect-[1/1.35] grid-cols-1 grid-rows-1 rounded-lg border border-dotted border-navy-400 bg-navy-600 bg-cover bg-center ${coverColor}"><div class="col-start-1 row-start-1 flex flex-col"><div class="flex items-center justify-between p-3 text-navy-200"><div class="flex items-center"><div role="tooltip" aria-label="${el?.platform}" data-microtip-position="right" class="css-1su536m"><svg class="block h-5 w-5"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?38#${el?.platform == "Steam" ? "steam-circle" : el?.platform?.toLowerCase()?.replace('.com', '')?.replace(' ', '-')?.replace('.', '')}"></use></svg></div><div class="ml-2 uppercase tracking-wide css-fqa9bi"><span class="css-oq0xea">${languageText?.chance}</span><br>${el?.chance}%</div></div><div class="flex items-center justify-center truncate rounded-md bg-navy-700 px-3 py-2 font-bold leading-none text-gold css-6plnry">${(el?.price)?.toFixed(2)}&nbsp;${currency}</div></div><div class="relative mx-auto flex-1 css-1x97c6v"><img src="${el?.cover}" alt="" class="absolute left-0 top-0 h-full w-full object-contain real-group-hover:scale-75 duration-300 ease-in-out transform pointer-events-none"></div><div class="z-10 col-start-1 row-start-2 w-full self-end justify-self-start rounded-b text-center font-semibold uppercase leading-tight sm:rounded-b-lg md:row-start-1 css-hed01d"><div class="truncate font-bold text-white css-6plnry" title="${el?.title}">${el?.title}</div><div class="uppercase tracking-wide css-fqa9bi" style="margin-top: 2px;margin-bottom: -11px;">Nonce: ${nonce}</div></div></div></div>`)
        );
    });
};