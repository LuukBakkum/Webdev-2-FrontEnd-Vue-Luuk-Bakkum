<template>
    <div class="modal" v-if="show" @click="close">
        <div class="modal-content" @click.stop>
            <button @click.stop="close" id="closeBtn">X</button>
            <slot></slot>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            show: false,
        };
    },
    provide() {
        return {
            openModal: this.open,
            closeModal: this.close,
        };
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
    },
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    text-align: left;
    background-color: white;
    color: black;
    padding: 20px;
    border-radius: 8px;
    max-width: 50%;
    box-sizing: border-box;
}

#closeBtn {
    color: white;
    background-color: red;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
}
</style>