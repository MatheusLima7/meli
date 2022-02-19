const win: any = window;

export const setGA = (type: 'page' | 'event', label: string, action: string | null) => {
  if (win.dataLayer === undefined) return;
  win.dataLayer.push({
    event: type === 'page' ? 'ga_virtual_pageview' : 'eventGA',
    ...(type === 'page' ? {
      ga_virtual_pageview: {
        pagepath: `rede-renda-fixa-experiencia-institucional/${label}`,
      },
    } : {
      eventGA: {
        category: 'Rede Renda Fixa Experiência Institucional',
        action,
        label,
      },
    }),
  });
};

export default {
  setGA,
};
