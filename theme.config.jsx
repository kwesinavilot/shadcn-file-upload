export default {
    logo: <h2 style={{ margin: 0, fontWeight: '500' }}>Shadcn File Upload</h2>,
    project: {
        link: 'https://github.com/kwesinavilot/shadcn-file-upload',
    },
    docsRepositoryBase: 'https://github.com/kwesinavilot/shadcn-file-upload/tree/main/pages',
    head: (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content="Shadcn File Upload" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://kwesinavilot.github.io/shadcn-file-upload/" />
            <meta property="og:image" content="https://kwnavilot.github.io/shadcn-file-upload/og.png" />
            <meta property="og:description" content="Shadcn File Upload is a file upload component for Shadcn UI." />
        </>
    ),
    footer: {
        text: (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div>
                    <p>Built by <a href="https://github.com/kwesinavilot" style={{ textDecoration: 'underline' }}>Kwesi Navilot</a></p>
                </div>

                <div>
                    <p>MIT License © {new Date().getFullYear()}</p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="https://github.com/kwesinavilot" target="_blank" rel="noreferrer" class="nx-p-2 nx-text-current">
                        <svg width="24" height="24" fill="currentColor" viewBox="3 3 18 18"><title>GitHub</title><path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path></svg><span class="nx-sr-only">GitHub</span><span class="nx-sr-only nx-select-none"> (opens in a new tab)</span>
                    </a>

                    <a href="https://twitter.com/kwesinavilot" target="_blank" rel="noreferrer" class="nx-p-2 nx-text-current">
                        <svg width="22" height="22" fill="currentColor" viewBox="3 3 1200 1200">
                            <title>X (Twitter)</title>
                            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path></svg>
                    </a>

                    <a href="https://www.linkedin.com/in/andrews-kwesi-ankomahene" target="_blank" rel="noreferrer" class="nx-p-2 nx-text-current">
                        <title>LinkedIn</title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                </div>
            </div>
        )
    }
}