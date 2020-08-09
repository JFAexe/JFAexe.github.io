/*
    Personal light landing page v2.2
    Copyright 2020 Alexandr 'JFAexe' Konichenko
    Uses
        Normalize.css
            https://github.com/necolas/normalize.css
        Anonymous Pro
            https://fonts.google.com/specimen/Anonymous+Pro
*/

const doc = document, lsg = localStorage,
      btn = doc.getElementById('_theme_btn'), lst = doc.body.classList,
      cls = 'darkmode', thm = 'theme', lgt = 'Light', drk = 'Dark'

if (JSON.parse(lsg.getItem(thm))) {
    btn.textContent = lst.contains(cls) ? drk : lgt

    lst.add(cls)
}

btn.addEventListener('click', () => {
    btn.textContent = lst.contains(cls) ? drk : lgt

    lsg.setItem(thm, lst.toggle(cls))
})

// Maybe js isn't that terrible? but === still a bruh moment