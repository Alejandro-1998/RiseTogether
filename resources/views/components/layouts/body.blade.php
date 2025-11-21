<x-layouts.app>

    @if (!Route::is('administrador'))
        
        <body class="font-display bg-[#fcfaf8] text-[#1c140d] dark:bg-[#1c140d] dark:text-[#fcfaf8]">
            <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div class="flex h-full grow flex-col">

                    <x-layouts.navbar />

                    <main class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-6">
                        {{ $slot }}
                    </main>

                    @if (!Route::is('login') && !Route::is('registro'))
                        <x-layouts.footer />
                    @endif

                </div>
            </div>
        </body>

    @else

        <body class="font-['Inter',sans-serif] bg-[#f8f7f5] dark:bg-[#221810] text-gray-800 dark:text-gray-200">
            <div class="flex h-screen">
                
                <x-admin.sidebar />

                <div class="flex-1 flex flex-col ml-64">
                    
                    <x-admin.header />

                    <main class="flex-1 overflow-y-auto p-8">
                        {{ $slot }}
                    </main>
                </div>
            </div>
        </body>

    @endif

</x-layouts.app>