$( document ).ready(async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;

    waitForElm('div.flex.items-center.gap-2 a[href="/#gold-area"]').then(async()=>{
        const tickets = await fetchUrl('GET', 'https://key-drop.com/pl/balance?battleTickets=1');

        $('div.flex.items-center.gap-2 a[href="/#gold-area"]').after($(document.createElement('a'))
            .addClass('cursor-pointe')
            .attr('href', '/#case-battle/list')
            .css({ height: '20px', 'margin-left': '-6px', 'margin-top': '-17px' })
            .html(`<div class="relative text-lightgreen-200 flex flex-shrink-0 leading-none" style="scale: 0.6;"><p class="absolute top-1/2 -translate-y-1/2 rounded-r tabular-nums pr-1.5 py-1 text-[12px] font-bold bg-[#1F1F27]" style="font-size: 16px;">x${tickets?.caseBattleTickets || 0}</p><svg class="icon flex-shrink-0 self-center h-9 w-12 sm:mr-3" viewBox="0 0 57.67 42" fill="currentColor"><path d="M19.97,39.53c.66,.66,1.03,1.55,1.03,2.47H55.33c.62,0,1.21-.25,1.65-.68,.44-.44,.68-1.03,.68-1.65v-12.83c-1.55,0-3.03-.61-4.12-1.71-1.09-1.09-1.71-2.58-1.71-4.12s.61-3.03,1.71-4.12c1.09-1.09,2.58-1.71,4.12-1.71V2.33c0-.62-.25-1.21-.68-1.65-.44-.44-1.03-.68-1.65-.68H21c0,.93-.37,1.82-1.03,2.47-.66,.66-1.55,1.03-2.47,1.03s-1.82-.37-2.47-1.03c-.66-.66-1.03-1.55-1.03-2.47H2.33C1.71,0,1.12,.25,.68,.68c-.44,.44-.68,1.03-.68,1.65V39.67c0,.62,.25,1.21,.68,1.65,.44,.44,1.03,.68,1.65,.68H14c0-.93,.37-1.82,1.03-2.47,.66-.66,1.55-1.03,2.47-1.03s1.82,.37,2.47,1.03Zm0-23.05c-.66,.66-1.55,1.03-2.47,1.03s-1.82-.37-2.47-1.03-1.03-1.55-1.03-2.47,.37-1.82,1.03-2.47c.66-.66,1.55-1.03,2.47-1.03s1.82,.37,2.47,1.03c.66,.66,1.03,1.55,1.03,2.47s-.37,1.82-1.03,2.47Zm0,14c-.66,.66-1.55,1.03-2.47,1.03s-1.82-.37-2.47-1.03c-.66-.66-1.03-1.55-1.03-2.47s.37-1.82,1.03-2.47c.66-.66,1.55-1.03,2.47-1.03s1.82,.37,2.47,1.03c.66,.66,1.03,1.55,1.03,2.47s-.37,1.82-1.03,2.47Z"></path></svg></div>`)
        );
    });
});