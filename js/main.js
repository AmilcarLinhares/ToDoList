
const Main = {
    
    tasks: [],

    init: function() {
        this.cacheSelector()
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
    },

    cacheSelector: function() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function() {
        const self = this

        this.$checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButtom_click
        });

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(self)

        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButtons_click.bind(self)
        })
    },

    getStoraged: function() {
        const tasks = localStorage.getItem('tasks')

        this.tasks = JSON.parse(tasks)
    },

    getTaskHtml: function(task) {
        return `
            <li>
                <div class="check"></div>
                <label class="task">
                    ${task}
                </label>
                <button class=" remove" data-task="${task}"></button>
            </li>
        `
    },

    buildTasks: function() {
        let html = ''

        if (this.tasks !== null){
            this.tasks.forEach(item => {
                html += this.getTaskHtml(item.task)
            })
        }

        this.$list.innerHTML = html

        this.cacheSelector()
        this.bindEvents()
    },

    Events: {
        checkButtom_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if (!isDone) {
                li.classList.add('done')
                return
            }

            li.classList.remove('done')
        },

        inputTask_keypress: function(e) {
            const key = e.key
            const value = e.target.value

            if (key === 'Enter') {
                this.$list.innerHTML += this.getTaskHtml(value)

                e.target.value = ''

                this.cacheSelector()
                this.bindEvents()

                let savedTasksObj = JSON.parse(localStorage.getItem('tasks'))

                if (savedTasksObj === null) { savedTasksObj = [] }
                const obj = [
                    { task: value},
                    ...savedTasksObj,
                ]

                localStorage.setItem('tasks', JSON.stringify(obj))
            }
        },

        removeButtons_click: function(e) {
            const li = e.target.parentElement
            const value = e.target.dataset['task']

            const newTasksState = this.tasks.filter(item => item.task !== value)
            
            localStorage.setItem('tasks', JSON.stringify(newTasksState))

            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        }
    }

}

Main.init()