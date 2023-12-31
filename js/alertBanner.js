$(document).ready(async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;
    const language = await getLanguageData(config?.lang);
    const server = await getServerData();
    if(!language || !server) return;

    if(!server?.current_versions?.includes(version))
        createToast('info', 'info_update', language['info_updateCheck'], 'https://github.com/Juzlus/KeydropPlus');

    if(server?.globalAlertVersion?.includes(config?.version))
        $('div#header-root')?.eq(0)
            ?.prepend($(document.createElement('div'))
                ?.attr('id', 'globalAlert')
                ?.addClass(`globalAlert-color-${server?.globalAlertType}`)
                ?.html(`<a style="filter: brightness(0.8);margin-right: 5px;">Keydrop+ Alert System:</a>${language[server?.globalAlertLangText]}`)
            );
});