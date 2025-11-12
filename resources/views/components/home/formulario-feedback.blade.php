<!-- Formulario Feedback -->
<section class="mb-20">
    <div class="bg-gray-100 dark:bg-gray-800 rounded-3xl p-10 sm:p-14 shadow-sm">
        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold leading-tight tracking-tight">Ayúdanos a mejorar</h2>
            <p class="mt-4 text-muted-light dark:text-muted-dark">
                Estamos siempre en crecimiento constante. ¿Qué tipo de proyectos te gustaría ver más?
            </p>
        </div>

        <form class="mx-auto mt-12 max-w-2xl space-y-6">
            <fieldset aria-labelledby="survey-legend" role="radiogroup">
                <legend id="survey-legend" class="sr-only">Categorías de proyectos</legend>
                <div class="space-y-4">
                    <label
                        class="flex cursor-pointer items-center rounded-lg border border-subtle-light bg-background-light p-4 hover:border-primary dark:border-subtle-dark dark:bg-subtle-dark dark:hover:border-primary">
                        <input type="radio" name="project-type"
                            class="form-radio h-5 w-5 text-primary focus:ring-primary" />
                        <span class="ml-4">Tecnología &amp; Innovación</span>
                    </label>
                    <label
                        class="flex cursor-pointer items-center rounded-lg border border-subtle-light bg-background-light p-4 hover:border-primary dark:border-subtle-dark dark:bg-subtle-dark dark:hover:border-primary">
                        <input type="radio" name="project-type"
                            class="form-radio h-5 w-5 text-primary focus:ring-primary" />
                        <span class="ml-4">Arte &amp; Cultura</span>
                    </label>
                    <label
                        class="flex cursor-pointer items-center rounded-lg border border-subtle-light bg-background-light p-4 hover:border-primary dark:border-subtle-dark dark:bg-subtle-dark dark:hover:border-primary">
                        <input type="radio" name="project-type"
                            class="form-radio h-5 w-5 text-primary focus:ring-primary" />
                        <span class="ml-4">Comunidad &amp; Bienes Sociales</span>
                    </label>
                    <label
                        class="flex cursor-pointer items-center rounded-lg border border-subtle-light bg-background-light p-4 hover:border-primary dark:border-subtle-dark dark:bg-subtle-dark dark:hover:border-primary">
                        <input type="radio" name="project-type"
                            class="form-radio h-5 w-5 text-primary focus:ring-primary" />
                        <span class="ml-4">Juegos &amp; Entretenimiento</span>
                    </label>
                </div>
            </fieldset>

            <div>
                <label for="feedback" class="sr-only">Feedback adicional</label>
                <textarea id="feedback" name="feedback" rows="4"
                    class="form-textarea w-full rounded-lg border-subtle-light bg-subtle-light text-text-light placeholder:text-muted-light focus:border-primary focus:ring-primary dark:border-subtle-dark dark:bg-subtle-dark dark:text-text-dark dark:placeholder:text-muted-dark"
                    placeholder="Alguna idea adicional?"></textarea>
            </div>

            <button type="submit"
                class="w-full flex h-12 items-center justify-center rounded-lg bg-primary px-5 text-base font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark">
                <span class="truncate">Enviar Feedback</span>
            </button>
        </form>
    </div>
</section>