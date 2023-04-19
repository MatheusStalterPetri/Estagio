<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>

<template>
  <div>
    <h1>Log Viewer</h1>
    <input type="file" @change="handleFileSelect($event)">
    <table id="customers">
      <thead>
        <tr>
          <th>Time Elapsed</th>
          <th>Tempo De Resposta / ms</th>
          <th>Endereco Do Cliente</th>
          <th>Códigos de resultado/status</th>
          <th>Tamanho da transferência / Mb</th>
          <th>Método de solicitação</th>
          <th>URL</th>
          <th>Tipo de conteúdo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in logs" :key="index">
          <td>{{ log.timeElapsed }}</td>
          <td>{{ log.tempoResposta }}</td>
          <td>{{ log.enderecoDoCliente }}</td>
          <td>{{ log.codeStatus }}</td>
          <td>{{ log.megabytes }}</td>
          <td>{{ log.methodUrl }}</td>
          <td>{{ log.uri }}</td>
          <td>{{ log.type }}</td>
        </tr>
      </tbody>
    </table>
    <apex-chart type="line" :options="chartOptions" :series="chartSeries"></apex-chart>
  </div>
</template>

<script>
import { VueApexCharts } from 'vue3-apexcharts';
import moment from 'moment';

export default {
  components: {
    ApexChart: VueApexCharts,
  },
  data() {
    return {
      logs: [],
      chartOptions: {
        chart: {
          id: 'log-chart',
          height: 300,
          type: 'line',
        },
        xaxis: {
          type: 'datetime',
          categories: [],
        },
        yaxis: {
          title: {
            text: 'Log Entries',
          },
        },
      },
      chartSeries: [{
        name: 'Entries',
        data: [],
      }],
    };
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const logs = reader.result.split('\n').map((log) => {
          const [timeElapsed, tempoResposta, enderecoDoCliente, codeStatus, bytes, methodUrl, uri, type] = log.split(' ');

          const formattedTime = moment.unix(timeElapsed).format('DD-MM-YYYY HH:mm:ss');

          return { timeElapsed: formattedTime, tempoResposta, enderecoDoCliente, codeStatus, bytes, methodUrl, uri, type };
        });

        this.logs = logs;

        const categories = logs.map((log) => log.timeElapsed);
        const data = logs.map((log) => log.bytes);
        this.chartOptions.xaxis.categories = categories;
        this.chartSeries[0].data = data;
      };

      reader.readAsText(file);
    },

  },
};
</script>
