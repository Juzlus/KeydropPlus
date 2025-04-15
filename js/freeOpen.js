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
            ?.html(`<div id="keydrop-plus-list" class="flex flex-col items-center grid-cols-3 space-y-4 border-b border-solid md:space-y-0 md:items-start md:grid border-navy-500"><div class="order-1 flex items-center space-x-4"></div><h2 class="order-3 inline-block px-10 py-5 mx-auto -mb-px text-xl font-semibold leading-tight text-center text-white uppercase border-b border-solid md:order-2 border-gold" style="margin-top: auto;">${languageText?.testDrops}</h2><form class="flex justify-end order-2 md:order-3" style="display: inline; margin-left: auto;"><input id="keydrop-plus-client-seed" value="${clientSeed}" minlength="3" size="38" maxlength="32" pattern="[a-zA-Z0-9]+" required="required" class="max-w-xs pl-3 -mr-6 p-2 text-xs font-semibold text-white transition-colors duration-150 bg-transparent border border-solid rounded-md border-navy-500 focus:border-navy-400 placeholder-navy-300 focus:outline-none"><input type="button" value="client seed" class="disabled items-center w-30 h-10 px-4 text-xs font-bold leading-none uppercase transition-colors duration-150 border border-solid rounded-md hover:text-white hover:bg-navy-550 bg-navy-600 whitespace-nowrap grid-stack disabled:pointer-events-none border-navy-300" style="user-select: none; cursor: pointer;"><br><input id="keydrop-plus-server-seed" value="${serverSeed}" minlength="32" size="38" maxlength="32" pattern="[a-zA-Z0-9]+" required="required" class="max-w-xs mt-4 mb-6 pl-3 -mr-6 p-2 text-xs font-semibold text-white transition-colors duration-150 bg-transparent border border-solid rounded-md border-navy-500 focus:border-navy-400 placeholder-navy-300 focus:outline-none"><input type="button" value="server seed" class="disabled items-center w-30 h-10 px-4 text-xs font-bold leading-none uppercase transition-colors duration-150 border border-solid rounded-md hover:text-white hover:bg-navy-550 bg-navy-600 whitespace-nowrap grid-stack disabled:pointer-events-none border-navy-300" style="user-select: none; cursor: pointer;"></form></div><ul id="keydrop-plus-drops-list" class="grid mt-8 mb-8 gap-2 css-a27jap"></ul><div style="text-align: center;margin-bottom: 14px;margin-top: -14px;"><span class="text-xs font-semibold uppercase leading-snug text-navy-300" style="margin-top: 32px;color: rgb(128 132 158);font-size: 12px;">${languageText?.caseCount}: <a style="color: rgb(106 109 129);margin-right: 20px;" id="caseDropCaseCount">0</a>${languageText?.caseSum}: <a style="color: rgb(106 109 129);margin-right: 20px;" id="caseDropCaseSum">0</a>${languageText?.skinsSum}: <a style="color: rgb(106 109 129);margin-right: 20px;" id="caseDropSkinsSum">0</a>${profitEnable ? `${languageText?.profit}: <a style="color: rgb(106 109 129);" id="caseDropProfit">0</a>` : ''}</span></div><div class="relative flex h-10 sm:h-15 mb-20"><input class="keydrop-plus-freeOpen-nonce" type="radio" checked="checked" id="keydrop-plus-select-nonce-6" name="keydrop-plus-select-nonce" style="width: 58px;"><label for="keydrop-plus-select-nonce-6" style="text-align: center; margin-left: auto;"><p>6</p></label><input class="keydrop-plus-freeOpen-nonce" type="radio" id="keydrop-plus-select-nonce-12" name="keydrop-plus-select-nonce" style="width: 58px;"><label for="keydrop-plus-select-nonce-12" style="text-align: center;"><p>12</p></label><input class="keydrop-plus-freeOpen-nonce" type="radio" id="keydrop-plus-select-nonce-18" name="keydrop-plus-select-nonce" style="width: 58px;"><label for="keydrop-plus-select-nonce-18" style="text-align: center;"><p>18</p></label><input class="keydrop-plus-freeOpen-nonce" type="radio" id="keydrop-plus-select-nonce-24" name="keydrop-plus-select-nonce" style="width: 58px;"><label for="keydrop-plus-select-nonce-24" style="text-align: center;"><p>24</p></label><input class="keydrop-plus-freeOpen-nonce" type="radio" id="keydrop-plus-select-nonce-30" name="keydrop-plus-select-nonce" style="width: 58px;"><label for="keydrop-plus-select-nonce-30" style="text-align: center;"><p>30</p></label><input class="keydrop-plus-freeOpen-nonce" type="radio" id="keydrop-plus-select-nonce-36" name="keydrop-plus-select-nonce" style="width: 58px;"><label for="keydrop-plus-select-nonce-36" style="text-align: center;"><p>36</p></label><input class="keydrop-plus-freeOpen-nonce" type="radio" id="keydrop-plus-select-nonce-42" name="keydrop-plus-select-nonce" style="width: 58px;"><label for="keydrop-plus-select-nonce-42" style="text-align: center; margin-right: auto;"><p>42</p></label></div>`)
        );
};

const createCaseItemList = async(itemDrops, languageText, currency) => {
    $('#keydrop-plus-drops-list')?.html('');
    itemDrops?.forEach((el, nonce) => {
        $('#keydrop-plus-drops-list')?.append($(document.createElement('li'))
            ?.addClass('css-ik2bl7 freeOpen')
            ?.html(`<li data-testid="case-content-card" class="will-change-transform @container [contain:content]"><div class="group relative z-0 flex aspect-[177/200] min-h-0 w-full flex-col rounded-lg border border-navy-500 bg-gradient-to-b from-navy-600 to-navy-700 transition-colors duration-[400ms] ease-expo will-change-transform hover:border-transparent @[14rem]:aspect-[230/200]"><div class="absolute -inset-px z-[-1] rounded-[inherit] opacity-0 transition-opacity duration-[400ms] ease-expo will-change-transform real-group-hover:opacity-100" style="background-image:${el?.gradient}"></div><a href="${el?.url}" title="${el?.name} | ${el?.name_s} ${el?.rarityFull?.length ? `(${el?.rarityFull})` : ''}" class="absolute inset-0 z-20"></a><div class="flex items-start justify-between p-3 pb-0"><div class="z-10 text-left text-10px uppercase leading-tight text-navy-200"><div class="flex flex-col css-5dt5vx"><span class="font-medium">Nonce</span><span data-testid="case-content-cards-grid-item-odds-percentage" class="font-semibold">${nonce}</span></div></div><div class="z-10 ml-auto text-right text-10px uppercase leading-tight text-navy-200"><div class="flex flex-col css-5dt5vx"><span class="font-medium">${languageText?.chance}</span><span data-testid="case-content-cards-grid-item-odds-percentage" class="font-semibold">${el?.chance?.toFixed(3)}%</span></div></div></div><div class="grid-stack relative m-auto grid min-h-0 w-10/12 flex-1 place-items-center"><svg width="136" height="136" viewBox="0 0 136 136" fill="none" class="h-full w-8/12"><g filter="url(#filter0_d_3528_6694)"><path d="M64 5.3094C66.4752 3.88034 69.5248 3.88034 72 5.3094L120.292 33.1906C122.767 34.6197 124.292 37.2607 124.292 40.1188V95.8812C124.292 98.7393 122.767 101.38 120.292 102.809L72 130.691C69.5248 132.12 66.4752 132.12 64 130.691L15.7083 102.809C13.2331 101.38 11.7083 98.7393 11.7083 95.8812V40.1188C11.7083 37.2607 13.2331 34.6197 15.7083 33.1906L64 5.3094Z" class="fill-[#282832] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="--fill: ${el?.dcolor}"></path></g><g data-hex-emblem-stroke="true" filter="url(#filter1_d_3528_6694)"><path d="M71.75 5.74241L120.042 33.6236C122.362 34.9634 123.792 37.4393 123.792 40.1188V95.8812C123.792 98.5607 122.362 101.037 120.042 102.376L71.75 130.258C69.4295 131.597 66.5705 131.597 64.25 130.258L15.9583 102.376C13.6378 101.037 12.2083 98.5607 12.2083 95.8812V40.1188C12.2083 37.4393 13.6378 34.9634 15.9583 33.6236L64.25 5.74241C66.5705 4.40267 69.4295 4.40267 71.75 5.74241Z" stroke="${el?.stroke}"></path></g><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" fill-opacity="0.18" style="--fill:${el?.dcolor}"></path><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" fill-opacity="0.18" style="--fill: ${el?.dcolor}"></path><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="--fill: ${el?.dcolor}"></path><path data-hex-emblem-signet="true" fill-rule="evenodd" clip-rule="evenodd" d="M73.7742 51.0885L68.8627 60.7734H68.8713C68.597 61.3266 69.0341 61.9819 69.6427 61.9309L79.4485 60.3905C79.9456 60.3309 80.2199 59.7266 79.9456 59.233L75.0428 51.0374C74.7685 50.5353 74.0485 50.5353 73.7742 51.0885ZM65.7728 61.9051L57.0546 59.4554C56.421 59.288 56.305 58.3715 56.8226 58.0278L62.7835 53.8773C63.185 53.5953 63.7026 53.7628 63.8721 54.221L66.683 60.7684C66.915 61.394 66.3975 62.0814 65.7639 61.9051H65.7728ZM63.6666 69.1036H54.9672C53.5708 69.1036 52.3999 67.9914 52.3999 66.543C52.3999 65.0946 53.5188 63.9824 54.9672 63.9824H63.6666V69.1036ZM65.7148 63.9824H69.8118V69.1036H65.7148V63.9824ZM65.7148 71.1514H69.8118V84.4665H65.7148V71.1514ZM55.4727 76.2066C55.4727 80.7739 59.1377 84.4665 63.6666 84.4665V71.1514H55.4727V76.2066ZM71.8604 69.1036H80.5597C81.9561 69.1036 83.127 67.9914 83.127 66.543C83.127 65.0946 82.0082 63.9824 80.5597 63.9824H71.8604V69.1036ZM80.0543 76.2066C80.0543 80.7739 76.3892 84.4665 71.8604 84.4665V71.1514H80.0543V76.2066Z" class="fill-[#454A56] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="--fill: ${el?.stroke}"></path><defs><filter id="filter0_d_3528_6694" x="11.7085" y="4.2373" width="112.583" height="131.525" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3528_6694"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3528_6694" result="shape"></feBlend></filter><filter id="filter1_d_3528_6694" x="11.7085" y="4.2373" width="112.583" height="131.525" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3528_6694"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3528_6694" result="shape"></feBlend></filter></defs></svg><img loading="lazy" alt="" class="pointer-events-none absolute w-10/12 object-contain transition duration-[400ms] ease-back will-change-transform real-group-hover:scale-90" src="${el?.icon}"></div><div class="z-10 w-full self-end p-3 pt-0 font-semibold leading-tight"><div data-testid="case-content-cards-grid-item-category" class="truncate text-xs text-navy-200">${el?.name} ${el?.rarity?.length ? `(${el?.rarity})` : '' }</div><div data-testid="case-content-cards-grid-item-name" class="truncate text-sm text-white">${el?.name_s}</div><div data-testid="case-content-cards-grid-item-price" class="mt-2 rounded bg-gold-800 py-[0.4375rem] text-center text-sm font-semibold leading-none text-gold-400">${parseFloat(el?.price)?.toFixed(2)} ${currency}</div></div><div class="absolute inset-x-7 -bottom-px h-px" style="background-color: ${el?.color}"></div></div></li>`)
        );
    });
};