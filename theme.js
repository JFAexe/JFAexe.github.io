/*
    Personal light landing page

    Copyright 2021 Alexandr 'JFAexe' Konichenko

    Uses
        Minimized Normalize.css
            https://github.com/necolas/normalize.css
        Anonymous Pro font
            https://fonts.google.com/specimen/Anonymous+Pro
*/

{
    function addThemeButton(btn, tag, cls, ift, iff, lst, stg) {
        let upd = () => btn.textContent = bcl.contains(cls) ? ift : iff

        if (JSON.parse(stg.getItem(tag))) {
            upd()

            lst.add(cls)
        }

        btn.addEventListener('click', () => {
            upd()

            stg.setItem(tag, lst.toggle(cls))
        })
    }

    let doc = document,
        lsg = localStorage,
        bcl = doc.body.classList

    addThemeButton(doc.getElementById('_dark_btn'), 'dark', 'darkmode', 'Dark', 'Light', bcl, lsg)
    addThemeButton(doc.getElementById('_soft_btn'), 'soft', 'softmode', 'Soft', 'Hard', bcl, lsg)
}