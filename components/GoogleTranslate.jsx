import { useEffect } from "react";
import { SelectPicker } from "rsuite";

const GoogleTranslate = () => {
    useEffect(() => {
        let script = document.createElement('script');
        script.setAttribute(
          'src',
          '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        );
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }, []);
    
      const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,ms,ta,zh-CN', // include this for selected languages
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      };
    
      return (
        <>
          <div id="google_translate_element"></div>
        </>
      );
}

export default GoogleTranslate;