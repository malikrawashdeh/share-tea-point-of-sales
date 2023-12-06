import { useEffect } from "react";

const GoogleTranslate = () => {
    useEffect(() => {
        let script = document.createElement('script');
        script.setAttribute(
          'src',
          'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        );
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }, []);
    
      const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout,
          },
          'google_translate_element'
        );
      };
    
      return (
          <div id="google_translate_element"></div>
      );
}

export default GoogleTranslate;