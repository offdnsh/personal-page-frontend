<template>
    <div>
        <sui-container style="padding: 0 0.9em;">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column>
                        <h4 style="margin-bottom: 12px;">Все файлы</h4>
                        <p style="display: block;margin-bottom: 32px;">Всего файлов: {{ files.length }}</p>
                        <label for="upload-file" style="margin-bottom: 32px;" class="file-loader">
                            <input type="file" id="upload-file" multiple
                                   accept="image/*, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                   @change="onChooseFile($event)" ref="file" hidden>
                            <span ref="filename">Нажмите для выбора файла</span>
                        </label>
                        <sui-dropdown
                            button
                            floating
                            labeled
                            icon="filter"
                            class="icon filtered-files"
                            v-model="filterBy"
                            text="Фильтрация"
                            :options="categories"
                            :disabled="loading"
                        >
                        </sui-dropdown>
                        <sui-segment vertical>
                            <sui-dimmer :active="loading" inverted>
                                <sui-loader size="small">Загрузка ...</sui-loader>
                            </sui-dimmer>
                            <sui-table celled padded>
                                <sui-table-header>
                                    <sui-table-row>
                                        <sui-table-header-cell>Наименование</sui-table-header-cell>
                                        <sui-table-header-cell v-if="filterBy === 'Всё'">Категория
                                        </sui-table-header-cell>
                                        <sui-table-header-cell>Дата загрузки</sui-table-header-cell>
                                        <sui-table-header-cell style="width: 80px;"></sui-table-header-cell>
                                    </sui-table-row>
                                </sui-table-header>
                                <sui-table-body v-if="files.length">
                                    <sui-table-row
                                        v-for="file in files"
                                        :key="file.id"
                                    >
                                        <sui-table-cell>{{ file.name }}</sui-table-cell>
                                        <sui-table-cell v-if="filterBy === 'Всё'">
                                            <sui-form>
                                                <select v-model="file.category" class="simple-select" @change="onChangeCategory($event, file.id)">
                                                    <option
                                                        v-for="category in [{ name: 'Остальное' }, { name: 'Награды' }, { name: 'Методички' }]"
                                                        :value="category.name"
                                                        :selected="category.name === file.category"
                                                    >{{ category.name }}</option>
                                                </select>
                                            </sui-form>
                                        </sui-table-cell>
                                        <sui-table-cell>{{ file.created_at | formated_date }}</sui-table-cell>
                                        <sui-table-cell>
                                            <sui-button size="small" negative @click.prevent="onDelete(file.id)">Удалить
                                            </sui-button>
                                        </sui-table-cell>
                                    </sui-table-row>
                                </sui-table-body>
                                <sui-table-body v-else>
                                    <sui-table-cell v-if="filterBy != 'Всё'">Файлов категории <b>{{ filterBy }}</b> не
                                        имеется.
                                    </sui-table-cell>
                                    <sui-table-cell v-else>Файлов не имеется</sui-table-cell>
                                </sui-table-body>
                            </sui-table>
                        </sui-segment>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>

<script>
import File from "../../modules/File";

export default {
    name: 'Files',
    metaInfo: {
        title: 'Файлы'
    },
    data: () => ({
        loading: false,
        filterBy: 'Всё',
        categories: [
            {
                key: 'Всё',
                text: 'Всё',
                value: 'Всё'
            },
            {
                key: 'Остальное',
                text: 'Остальное',
                value: 'Остальное'
            },
            {
                key: 'Награды',
                text: 'Награды',
                value: 'Награды'
            },
            {
                key: 'Методички',
                text: 'Методички',
                value: 'Методички'
            }
        ],
        files: []
    }),
    created() {
        this.fetchFiles()
    },
    methods: {
        fetchFiles() {
            this.loading = true
            const params = new URLSearchParams(`category=${this.filterBy}`)
            File.getAll(params).then(response => {
                this.files = response.data
                this.loading = false
            }).catch(error => {
                console.error(error)
            })
        },
        onChooseFile(e) {
            if (e.target.files.length) {
                this.loading = true
                const files = e.target.files

                const form = new FormData()

                for (const i of Object.keys(files)) {
                    form.append('files[]', files[i])
                }

                File.upload(form).then(response => {
                    this.fetchFiles()
                }).catch(error => {

                })
            }
        },
        onDelete(id) {

            if (!confirm('Вы действительно хотите удалить файл?')) {
                return
            }

            this.loading = true
            File.destroy(id).then(() => {
                this.filterBy = 'Всё'
                this.fetchFiles()
            })
        },
        onChangeCategory(event, id) {
            this.loading = true
            const category = event.target.value

            File.updateCategory(id, category).then(response => {
                this.fetchFiles()
            })
        }
    },
    watch: {
        filterBy: function () {
            this.fetchFiles()
        }
    }
}
</script>

<style scoped>

</style>