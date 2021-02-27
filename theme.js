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
    let doc = document,
        lsg = localStorage,
        bcl = doc.body.classList

    function addThemeButton(btn, tag, cls, ift, iff, lst = bcl, stg = lsg) {
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

    addThemeButton(doc.getElementById('_dark_btn'), 'dark', 'darkmode', 'Dark', 'Light')
    addThemeButton(doc.getElementById('_soft_btn'), 'soft', 'softmode', 'Soft', 'Hard')
}