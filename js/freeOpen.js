let maxNonce = 5;
let clientSeed = '';
let serverSeed = '';
const availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function CreateCaseDropMenu(dropList, languageText, casePrice, casePriceFrom) {
    for(let j = 0; j < 32; j++)
        serverSeed += availableChars[Math?.floor(Math?.random() * availableChars?.length)];
        
    clientSeed = $('.flex-1.max-w-xs.pl-3.-mr-6.text-xs.font-semibold.text-white.transition-colors.duration-150').val() || serverSeed?.slice(5, 13);
    const profitEnable = casePriceFrom !== "gold";
    createCaseDropSelection(languageText, profitEnable);
    getCaseDrop(dropList, casePrice, profitEnable, languageText);

    $('#keydrop-plus-client-seed').blur(async(e) => {
        clientSeed = e.target.value;
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('#keydrop-plus-server-seed').blur(async(e) => {
        serverSeed = e.target.value;
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('input[value="server seed"]').on('click', async(e) => {
        serverSeed = '';
        for(let j = 0; j < 32; j++)
            serverSeed += availableChars[Math?.floor(Math?.random() * availableChars?.length)];
        $('#keydrop-plus-server-seed').val(serverSeed);
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('input[value="client seed"]').on('click', async() => {
        clientSeed = '';
        for(let j = 0; j < 8; j++)
        clientSeed += availableChars[Math?.floor(Math?.random() * availableChars?.length)];
        $('#keydrop-plus-client-seed').val(clientSeed);
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('#keydrop-plus-select-nonce-6').on('click', async() => {
        maxNonce = 5;
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('#keydrop-plus-select-nonce-12').on('click', async() => {
        maxNonce = 11;
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('#keydrop-plus-select-nonce-18').on('click', async() => {
        maxNonce = 17;
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('#keydrop-plus-select-nonce-24').on('click', async() => {
        maxNonce = 23;
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('#keydrop-plus-select-nonce-30').on('click', async() => {
        maxNonce = 29;
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('#keydrop-plus-select-nonce-36').on('click', async() => {
        maxNonce = 35;
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });

    $('#keydrop-plus-select-nonce-42').on('click', async() => {
        maxNonce = 41;
        getCaseDrop(dropList, casePrice, profitEnable, languageText);
    });
};

const getCaseDrop = async(dropList, casePrice, profitEnable, languageText) => {
    const itemDrops = [];
    let skinsSum = 0;

    for(i=0; i<=maxNonce; i++) {
        const hash = CryptoJS.HmacSHA512(serverSeed, `${clientSeed}-${i}`);
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
    $('#caseDropCaseCount')?.text(maxNonce+1);
    $('#caseDropCaseSum')?.text(`${(casePrice * (maxNonce+1))?.toFixed(profitEnable ? 2 : 0)} ${profitEnable ? currency : 'Gold'}`);
    $('#caseDropSkinsSum')?.text(`${skinsSum?.toFixed(2)} ${currency}`);
    if(profitEnable)
        $('#caseDropProfit')?.text(`${(skinsSum - (casePrice * (maxNonce+1)))?.toFixed(2)} ${currency}`);
    createCaseItemList(itemDrops, languageText, currency);
};

const createCaseDropSelection = async(languageText, profitEnable) => {
    $('#caseInfoPanel')
        ?.after($(document.createElement('selection'))
            ?.attr({ id: 'keydrop-plus-free-open' })
            ?.html(`<div id="keydrop-plus-list" class="flex flex-col items-center grid-cols-3 space-y-4 border-b border-solid md:space-y-0 md:items-start md:grid border-navy-500"><div class="order-1 flex items-center space-x-4"></div><h2 class="order-3 inline-block px-10 py-5 mx-auto -mb-px text-xl font-semibold leading-tight text-center text-white uppercase border-b border-solid md:order-2 border-gold" style="margin-top: auto;">${languageText?.testDrops}</h2><form class="flex justify-end order-2 md:order-3" style="display: inline; margin-left: auto;"><input id="keydrop-plus-client-seed" value="${clientSeed}" minlength="3" size="38" maxlength="32" pattern="[a-zA-Z0-9]+" required="required" class="max-w-xs pl-3 -mr-6 p-2 text-xs font-semibold text-white transition-colors duration-150 bg-transparent border border-solid rounded-md border-navy-500 focus:border-navy-400 placeholder-navy-300 focus:outline-none"><input type="button" value="client seed" class="disabled items-center w-30 h-10 px-4 text-xs font-bold leading-none uppercase transition-colors duration-150 border border-solid rounded-md hover:text-white hover:bg-navy-550 bg-navy-600 whitespace-nowrap grid-stack disabled:pointer-events-none border-navy-300" style="user-select: none; cursor: pointer;"><br><input id="keydrop-plus-server-seed" value="${serverSeed}" minlength="32" size="38" maxlength="32" pattern="[a-zA-Z0-9]+" required="required" class="max-w-xs mt-4 mb-6 pl-3 -mr-6 p-2 text-xs font-semibold text-white transition-colors duration-150 bg-transparent border border-solid rounded-md border-navy-500 focus:border-navy-400 placeholder-navy-300 focus:outline-none"><input type="button" value="server seed" class="disabled items-center w-30 h-10 px-4 text-xs font-bold leading-none uppercase transition-colors duration-150 border border-solid rounded-md hover:text-white hover:bg-navy-550 bg-navy-600 whitespace-nowrap grid-stack disabled:pointer-events-none border-navy-300" style="user-select: none; cursor: pointer;"></form></div><ul id="keydrop-plus-drops-list" class="grid mt-8 mb-8 gap-2 css-a27jap"></ul><div style="text-align: center;margin-bottom: 14px;margin-top: -14px;"><span class="text-xs font-semibold uppercase leading-snug text-navy-300" style="margin-top: 32px;color: rgb(128 132 158);font-size: 12px;">${languageText?.caseCount}: <a style="color: rgb(106 109 129);margin-right: 20px;" id="caseDropCaseCount">0</a>${languageText?.caseSum}: <a style="color: rgb(106 109 129);margin-right: 20px;" id="caseDropCaseSum">0</a>${languageText?.skinsSum}: <a style="color: rgb(106 109 129);margin-right: 20px;" id="caseDropSkinsSum">0</a>${profitEnable ? `${languageText?.profit}: <a style="color: rgb(106 109 129);" id="caseDropProfit">0</a>` : ''}</span></div><div class="relative flex h-10 sm:h-15 mb-20"><label style="text-align: center; margin-left: auto;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 rounded-l sm:rounded-l-lg ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" checked="checked" id="keydrop-plus-select-nonce-6" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">6</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-12" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">12</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-18" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">18</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-24" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">24</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-30" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">30</p></label><label style="text-align: center;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-36" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">36</p></label><label style="text-align: center; margin-right: auto;"><input class="keydrop-plus-freeOpen-nonce flex-1 flex sm:px-6 justify-center cursor-pointer items-center h-full w-full text-center font-bold text-xs sm:text-sm leading-tight bg-navy-700 border border-solid border-navy-500 transition-colors duration-200 rounded-r sm:rounded-r-lg ml-0 text-gold hover:text-white hover:bg-navy-600" type="radio" id="keydrop-plus-select-nonce-42" name="keydrop-plus-select-nonce" style="width: 58px;"><p style="margin-top: -41px; cursor: pointer;">42</p></label></div>`)
        );
};

const createCaseItemList = async(itemDrops, languageText, currency) => {
    $('#keydrop-plus-drops-list')?.html('');
    itemDrops?.forEach((el, nonce) => {
        $('#keydrop-plus-drops-list')?.append($(document.createElement('li'))
            ?.addClass('css-ik2bl7 freeOpen')
            ?.html(`<div class="z-0 grid items-center justify-center grid-cols-1 grid-rows-1 bg-center bg-cover border border-dotted rounded group justify-items-center ratio border-navy-400 sm:rounded-lg css-kd-p-fo" style="height: 175px;"><a href="${el?.url}" title="${el?.name} | ${el?.name_s} ${el?.rarity?.length ? `(${el?.rarity})` : '' }" class="z-20 col-start-1 row-start-1 row-end-3 h-full w-full"></a><div class="z-10 col-start-1 row-start-1 mb-auto ml-auto font-semibold leading-none text-right uppercase text-navy-200 css-1f31obc">${languageText?.chance}<br><span class="css-ix4kef" style="font-size: 95%">${el?.chance?.toFixed(3)}%</span></div><span class="z-10 col-start-1 row-start-1 mb-auto ml-auto font-semibold leading-none uppercase text-navy-200 css-1f31obc" style="margin-right: 165px;">Nonce<br>${nonce}</span><img src="${el?.background}" class="object-contain col-start-1 mt-6 md:mt-0 row-start-1 duration-300 transform real-group-hover:scale-110 ease-in-out text-red css-96c4l3"><img class="object-contain w-3/4 col-start-1 row-start-1 mt-6 duration-300 ease-in-out transform pointer-events-none sm:mt-0 real-group-hover:scale-75 real-group-hover:rotate-10 css-1w1pcrf" src="${el?.icon}"><div class="z-10 self-end w-full col-start-1 row-start-2 font-semibold leading-tight uppercase md:row-start-1 justify-self-start css-1jurzha"><div class="truncate text-navy-200 css-1vba4yg">${el?.name_s} ${el?.rarityFull?.length ? `(${el?.rarityFull})` : ''}</div><div class="font-bold text-white truncate css-6plnry">${el?.name}</div><div class="-mb-1 font-bold truncate text-gold css-6plnry">${parseFloat(el?.price)?.toFixed(2)} ${currency}</div></div></div>`)
        );
    });
};