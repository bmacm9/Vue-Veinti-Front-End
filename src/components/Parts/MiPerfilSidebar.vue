<template>
    <div class="row total ml-5">
        <div class="col-12">
            <div class="row mt-4 justify-content-end">
                <div class="col-11 bg-white cajaPerfil">
                    <div class="row info-row-perfil pt-2 pb-2">
                        <img class="imagenPerfil" :src="user.foto"/>
                    </div>
                </div>
            </div>
            <div class="row mt-4 justify-content-end">
                <div class="col-11">
                    <div class="row row-informacion-title border-bottom mr-2">
                        <div class="col-12">
                            <h3 class="informacion-title">Información</h3>
                        </div>
                    </div>
                    <div class="row mt-3 row-informacion-content">
                        <div class="col-12">
                            <p><strong>Fecha de Nacimiento: </strong>{{user.nacimiento}}</p>
                        </div>
                        <div class="col-12">
                            <p><strong>Genero: </strong>{{user.genero}}</p>
                        </div>
                        <div class="col-12">
                            <p><strong>Edad: </strong>{{edad}}</p>
                        </div>
                        <div class="col-12">
                            <p><strong>Estado: </strong>{{user.estadoCivil}}</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
    props: {
        user: Object,
    },

    computed: {

        edad(){
            let arrayFecha = this.user.nacimiento.split('-')
            //let born = new Date(arrayFecha[0], arrayFecha[1], arrayFecha[2])
            let born = new Date(arrayFecha[0], '3', arrayFecha[2])
            let now = new Date();
            if (now >= born) 
                return now.getFullYear() - born.getFullYear();
            else
                return now.getFullYear() - born.getFullYear() - 1;
        }
    }

}
</script>

<style scoped>
    .total {
        background-color: #f5f5f5;
        padding: 0 !important;
        border-left: 2px solid #e7e7e7;
    }
    
    .cajaPerfil {
        border-top: 2px solid #e7e7e7;
        border-bottom: 2px solid #e7e7e7;
        border-left: 2px solid #e7e7e7;
        box-shadow: 0 4px 2px -2px gray;
    }

    .info-row-perfil {
        margin: 5px 0;
    }


    .imagenPerfil {
        border: 2px solid #e7e7e7;
        width: 40px;
        height: 40px;
    }

    .imagenPerfil {
        height: 300px;
        width: 300px;

    }

    .informacion-title {
        font-size: 18px;
        font-weight: 600;
    }

    .row-informacion-content p {
        font-size: 14px;
        margin-bottom: 5px;
    }
</style>