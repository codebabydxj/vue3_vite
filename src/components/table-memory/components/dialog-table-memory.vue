<template>
  <el-drawer
    size="450px"
    title="表格列配置"
    :modelValue="dialogShow"
    :append-to-body="true"
    :before-close="cancel">
    <el-row type="flex" justify="center" v-if="dialogShow">
      <el-table
        border
        stripe
        :data="titleListClone"
        :max-height="400">
        <el-table-column type="index" align="center" label="序号" width="55"></el-table-column>
        <el-table-column prop="name" align="center" label="列名称"></el-table-column>
        <el-table-column align="center" label="是否显示">
          <template #default="scope">
            <el-switch active-color="#13ce66" inactive-color="#d8dce5" :disabled="scope.row.isDisabled" v-model="scope.row.status"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="update">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import _ from 'lodash';

export default defineComponent({
  props: {
    dialogShow: {
      type: Boolean,
      default: false,
    },
    titleList: {
      type: Array,
      defalut: [],
    },
  },
  emits: ['closeDialog'],
  setup(props, { emit }) {
    const titleListClone: any =  ref([])

    watch(() => props.dialogShow, (newVal: any) => {
      if (newVal) {
        titleListClone.value = _.cloneDeep(props.titleList);
      }
    })

    const cancel = () => {
      emit('closeDialog', false);
    }

    const update = () => {
      emit('closeDialog', titleListClone.value);
    }

    return {
      titleListClone,
      cancel,
      update
    }
  }
});
</script>
