<template>

<div class="div-header-primary  color-047488 text-left pl-3">About browser fingerprinting</div>
    
<div class="pt-3">
        <div class="div-header  color-047488 text-left pl-3 font-weight-bold">What is browser fingerprinting?</div>
        <hr />
        <div class="p-2">
            Browser fingerprinting is a way websites can find out a lot of information about your computer or phone just by
            you visiting them. This info includes things like what kind of device you're using, what browser you have, and
            other settings. Even though each piece of information might seem small and unimportant, when you put it all
            together, it can create a unique "fingerprint" for you. This means that websites can recognize you and track
            what you do online, even if you don't tell them who you are.

        </div>
        <hr/>
        <div class="div-header  color-047488 text-left pl-3 font-weight-bold">Browser Fingerprinting Methods</div>
        
        <div class="p-2">
            Browser fingerprinting involves several techniques to collect information about a user's device and browser.
            Here
            are some of the common methods used:

        </div>
        <hr>
        <div class="row text-left">
            <div class="col-12 br-1">
                <div class="row ">
                    <div class="col-3 p-3 color-047488  font-weight-bold "> Profile name</div>
                    <div class="col-9 p-3"> The user agent string is a text that the browser sends to websites, identifying
                        the browser type, version, and the operating system. This string can provide a starting point for
                        creating a fingerprint. </div>
                </div>
            </div>
            <div class="col-12 br-1">
                <div class="row ">
                    <div class="col-3 p-3 color-047488  font-weight-bold">HTTP Headers</div>
                    <div class="col-9 p-3">Beyond the user agent, HTTP headers include additional details like the
                        accepted
                        languages, encoding types, and sometimes device's screen resolution. These headers vary slightly
                        from one browser to another and can contribute to the uniqueness of a fingerprint.
                    </div>
                </div>
            </div>
            <div class="col-12 br-1">
                <div class="row ">
                    <div class="col-3 p-3 color-047488  font-weight-bold"> JavaScript APIs</div>
                    <div class="col-9 p-3"> Websites can use JavaScript to access more detailed information about your
                        device. This includes data points like your screen resolution, timezone, whether you have a
                        touchscreen, and even the battery level of your device. JavaScript can also detect installed
                        fonts
                        and plugins, which can be quite distinctive.</div>
                </div>
            </div>
            <div class="col-12 br-1">
                <div class="row ">
                    <div class="col-3 p-3 color-047488  font-weight-bold"> Canvas Fingerprinting</div>
                    <div class="col-9 p-3"> This technique uses the HTML canvas element to draw graphics or text. Since
                        different devices and browsers can render the canvas in slightly different ways, this can be
                        used to
                        identify and track users.</div>
                </div>
                </div>
                <div class="col-12 br-1">
                    <div class="row ">
                        <div class="col-3 p-3 color-047488  font-weight-bold"> WebRTC</div>
                        <div class="col-9 p-3"> Web Real-Time Communication (WebRTC) can reveal your real IP address, even
                            if
                            you're using a VPN. This information can add another layer to your digital fingerprint.</div>
                    </div>
                </div>
                <div class="col-12 br-1">
                    <div class="row ">
                        <div class="col-3 p-3 color-047488  font-weight-bold">Audio and Video Fingerprinting</div>
                        <div class="col-9 p-3"> Similar to canvas fingerprinting, browsers may process audio and video
                            content
                            differently. By analyzing how your browser renders audio or video, websites can gather more
                            clues
                            about your device.</div>
                    </div>
                </div>
                <div class="col-12 br-1">
                    <div class="row ">
                        <div class="col-3 p-3 color-047488  font-weight-bold">Font Detection</div>
                        <div class="col-9 p-3"> By checking which fonts you have installed, websites can infer about your
                            operating system and the software you use. Since users often have unique sets of fonts, this can
                            significantly add to the fingerprint's uniqueness.</div>
                    </div>
                </div>
                <div class="col-12 br-1">
                    <div class="row ">
                        <div class="col-3 p-3 color-047488  font-weight-bold">Hardware Interaction:</div>
                        <div class="col-9 p-3"> Information about how your device interacts with hardware, like gamepads or
                            virtual reality equipment, can also be collected.</div>
                    </div>
                </div>
                <div class="col-12 br-1">
                    <div class="row ">
                        <div class="col-3 p-3 color-047488  font-weight-bold">Hardware Interaction:</div>
                        <div class="col-9 p-3"> Information about how your device interacts with hardware, like gamepads or
                            virtual reality equipment, can also be collected.</div>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="p-2">
                These methods, individually or combined, enable websites to compile a detailed profile of your browsing
                device.
                While each piece of information might seem minor, together they form a unique identifier that can be used
                for
                tracking online activities, often without explicit consent from the user. This raises privacy concerns, as
                it's
                difficult for users to block or control this type of data collection effectively.

            </div>
        </div>


</template>

<style>
.color-047488 {
    color: #047488;
}

.div-header-primary{
    padding: 10px 0;
    border-bottom: 1px solid gray;
}

</style>