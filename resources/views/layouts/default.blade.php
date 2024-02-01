<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no">
        <title>{{ $title ?? 'skindiagnosis-survey'}}</title>
        <meta property="og:type" content="website">

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <meta name="robots" content="noindex">

        <!-- sdk -->
        <script>
            (function (d,k) {
              var s = d.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://plugins-media.makeupar.com/c43975/sdk.js?apiKey=' + k; // KAO PlayPark 正式版

              var x = d.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            })(document, 'Mtvd6DEzSxZpp7fCmrfJ9w');

            // 起動イベント
            window.ymkAsyncInit = function () {}

        </script>

        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700&display=swap" rel="stylesheet">

        {{-- <script src="https://s3-twany-test-cloud9-ja67agaha1.s3.ap-northeast-1.amazonaws.com/assets/javascripts/pico.js"></script> --}}
        {{-- <script src="{{ asset('jp/kbbplaypark/assets/lib/js/pico.js') }}"></script> --}}

        @vite(['resources/sass/app.scss'])
        @viteReactRefresh
        @vite(['resources/ts/app.tsx'])
    </head>
    <body class="p-skin-check" data-page="kbbpp-skincheck" data-intcmp="kbb-playpark">
        <div class="main">
            <div class="l-header-area">
              @include('layouts.header')
            </div>

            @include('layouts.menu')

            <!-- #loading -->
            <div id="skinDiagnosisLoading">
              <img src="/icons/purple.svg" alt="ローディング" />
            </div>

            <div id="app" class="skinDiagnosis"></div>
            @yield('content')

            <!-- playpark core -->
            <div id="wrapper">
              @include('layouts.footer')
            </div>
            <!-- playpark core -->

        </div>
    </body>
</html>
