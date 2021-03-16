import React, { memo, useState } from 'react'
import {English,Deutsch,Español,Français,Português,简体中文} from '../../../constant'
import {
    setTranslations,
    setDefaultLanguage,
    setLanguageCookie,
    setLanguage,
  } from 'react-switch-lang';
import en from '../../../assets/i18n/en.json';
import es from '../../../assets/i18n/es.json';
import pt from '../../../assets/i18n/pt.json';
import fr from '../../../assets/i18n/fr.json';
import du from '../../../assets/i18n/du.json';
import cn from '../../../assets/i18n/cn.json';
import ae from '../../../assets/i18n/ae.json';
setTranslations({ en, es, pt, fr, du, cn, ae });
setDefaultLanguage('en');
setLanguageCookie();


const LanguageSelectionComponent=memo((props)=> {
    const [selected, setSelected] = useState("en")
    const [langdropdown, setLangdropdown] = useState(false)

    const LanguageSelection = (language) => {
        if (language) {
          setLangdropdown(!language)
        } else {
          setLangdropdown(!language)
        }
      }

      const handleSetLanguage = (key) => {
        setLanguage(key);
        setSelected(key)
      };
    return (
        <div className={`translate_wrapper ${langdropdown ? 'active' : ''}`}>
            <div className="current_lang">
                <div className="lang" onClick={() => LanguageSelection(langdropdown)}>
                    <i className={`flag-icon flag-icon-${selected === "en" ? "us" : selected === "du" ? "de" : selected}`}></i>
                    <span className="lang-txt">{selected}</span>
                </div>
            </div>
            <div className={`more_lang ${langdropdown ? 'active' : ''}`}>
            <div className="lang" onClick={() => handleSetLanguage('en')}><i className="flag-icon flag-icon-us"></i><span className="lang-txt">{English}<span> {"(US)"}</span></span></div>
            <div className="lang" onClick={() => handleSetLanguage('du')}><i className="flag-icon flag-icon-de"></i><span className="lang-txt">{Deutsch}</span></div>
            <div className="lang" onClick={() => handleSetLanguage('es')}><i className="flag-icon flag-icon-es"></i><span className="lang-txt">{Español}</span></div>
            <div className="lang" onClick={() => handleSetLanguage('fr')}><i className="flag-icon flag-icon-fr"></i><span className="lang-txt">{Français}</span></div>
            <div className="lang" onClick={() => handleSetLanguage('pt')}><i className="flag-icon flag-icon-pt"></i><span className="lang-txt">{Português}<span> {"(BR)"}</span></span></div>
            <div className="lang" onClick={() => handleSetLanguage('cn')}><i className="flag-icon flag-icon-cn"></i><span className="lang-txt">{简体中文}</span></div>
            <div className="lang" onClick={() => handleSetLanguage('ae')}><i className="flag-icon flag-icon-ae"></i><span className="lang-txt">{"لعربية"}<span> {"(ae)"}</span></span></div>
            </div>
        </div>
    )
})

export default LanguageSelectionComponent
