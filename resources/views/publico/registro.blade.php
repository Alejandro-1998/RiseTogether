<x-layouts.app>

        <section class="relative isolate">
            <div class="pointer-events-none absolute inset-0 -z-10">
                <div class="mx-auto max-w-5xl h-72 rounded-4xl bg-[#f4ede7]/70 dark:bg-[#2a2017]/50 blur-0">
                </div>
            </div>

            <div
                class="mx-auto grid max-w-5xl gap-0 overflow-hidden rounded-2xl border border-[#f4ede7] bg-white shadow-sm dark:border-[#2a2017] dark:bg-[#2a2017] md:grid-cols-2">
                <div class="p-8 sm:p-10">
                    <div class="mb-6">
                        <p class="text-xs uppercase tracking-[0.18em] text-[#9c7049] dark:text-[#a18a7a]">Registro
                        </p>
                        <h1 class="mt-2 text-3xl font-black tracking-tight">Crear cuenta</h1>
                        <p class="mt-2 text-sm text-[#9c7049] dark:text-[#a18a7a]">
                            Únete para conectar, colaborar y dar vida a tus ideas con la comunidad de Rise Together.
                        </p>
                    </div>

                    <form method="post" action="/register" class="space-y-5" novalidate>
                        @csrf 
                        <div>
                            <label for="full_name" class="block text-sm font-medium">Nombre completo</label>
                            <div class="relative mt-1">
                                <span
                                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9c7049] dark:text-[#a18a7a]">person</span>
                                <input id="full_name" name="full_name" type="text" autocomplete="name" required
                                    placeholder="Tu nombre y apellidos"
                                    class="form-input w-full h-8 rounded-lg border-none bg-[#f4ede7] pl-10 text-[#1c140d] placeholder:text-[#9c7049] focus:ring-2 focus:ring-[#f2780d] dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:placeholder:text-[#a18a7a]" />
                            </div>
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium">Email</label>
                            <div class="relative mt-1">
                                <span
                                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9c7049] dark:text-[#a18a7a]">mail</span>
                                <input id="email" name="email" type="email" autocomplete="email" required
                                    class="form-input w-full h-8 rounded-lg border-none bg-[#f4ede7] pl-10 text-[#1c140d] placeholder:text-[#9c7049] focus:ring-2 focus:ring-[#f2780d] dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:placeholder:text-[#a18a7a]" />
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium">Contraseña</label>
                            <div class="relative mt-1">
                                <span
                                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9c7049] dark:text-[#a18a7a]">lock</span>
                                <input id="password" name="password" type="password" autocomplete="new-password"
                                    minlength="6" required placeholder="Crea una contraseña segura"
                                    class="form-input w-full h-8 rounded-lg border-none bg-[#f4ede7] pl-10 text-[#1c140d] placeholder:text-[#9c7049] focus:ring-2 focus:ring-[#f2780d] dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:placeholder:text-[#a18a7a]" />
                            </div>
                        </div>

                        <div>
                            <label for="password_confirmation" class="block text-sm font-medium">Confirmar
                                contraseña</label>
                            <div class="relative mt-1">
                                <span
                                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9c7049] dark:text-[#a18a7a]">password</span>
                                <input id="password_confirmation" name="password_confirmation" type="password"
                                    autocomplete="new-password" minlength="6" required
                                    placeholder="Repite tu contraseña"
                                    class="form-input w-full h-8 rounded-lg border-none bg-[#f4ede7] pl-10 text-[#1c140d] placeholder:text-[#9c7049] focus:ring-2 focus:ring-[#f2780d] dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:placeholder:text-[#a18a7a]" />
                            </div>
                        </div>

                        <div class="flex items-start gap-2 text-sm">
                            <input id="terms" name="terms" type="checkbox" required
                                class="mt-1 rounded border-[#9c7049] text-[#f2780d] focus:ring-[#f2780d] dark:border-[#a18a7a]" />
                            <label for="terms" class="text-[#9c7049] dark:text-[#a18a7a]">
                                He leído y acepto los <a href="#"
                                    class="text-[#f2780d] font-semibold hover:opacity-80">Términos y Condiciones</a>.
                            </label>
                        </div>

                        <button type="submit"
                            class="inline-flex w-full items-center justify-center rounded-lg bg-[#f2780d] px-4 py-3 font-bold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d]">
                            Crear cuenta
                        </button>

                        <div class="relative my-4">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-[#f4ede7] dark:border-[#2a2017]"></div>
                            </div>
                            <div class="relative flex justify-center">
                                <span
                                    class="bg-white px-2 text-xs text-[#9c7049] dark:bg-[#2a2017] dark:text-[#a18a7a]">o
                                    continúa con</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button type="button"
                                class="inline-flex items-center justify-center gap-2 rounded-lg border border-[#f4ede7] bg-white px-3 py-2 text-sm font-semibold hover:bg-[#f4ede7]/50 dark:border-[#2a2017] dark:bg-[#2a2017] dark:hover:bg-[#2a2017]/80">
                                <svg class="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                            <button type="button"
                                class="inline-flex items-center justify-center gap-2 rounded-lg border border-[#f4ede7] bg-white px-3 py-2 text-sm font-semibold hover:bg-[#f4ede7]/50 dark:border-[#2a2017] dark:bg-[#2a2017] dark:hover:bg-[#2a2017]/80">
                                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                GitHub
                            </button>
                        </div>

                        <p class="text-center text-sm text-[#9c7049] dark:text-[#a18a7a]">
                            ¿Ya tienes cuenta?
                            <a href="{{ route('login') }}" class="font-bold text-[#f2780d] hover:opacity-80">Inicia sesión</a>
                        </p>
                    </form>
                </div>

                <x-login_registro.video-loginRegistro />

            </div>
        </section>

</x-layouts.app>