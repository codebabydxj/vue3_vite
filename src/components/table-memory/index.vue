<template>
  <div style="margin-bottom: 10px;">
    <el-button type="primary" @click="show">
      <el-icon>
        <Setting />
      </el-icon>
      &nbsp;表格列配置
    </el-button>
    <dialog-table-memory v-if="dialogTableMemoryShow" :dialogShow="dialogTableMemoryShow" :titleList="titleList"
      @closeDialog="closeDialogTableMemory">
    </dialog-table-memory>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import _ from 'lodash';
import _localStorage from '@/utils/storage/localStorage';
import dialogTableMemory from './components/dialog-table-memory.vue';

export default defineComponent({
  components: {
    dialogTableMemory,
  },
  props: {
    titleList: {
      type: Array,
      required: true,
    },
    tableTitle: {
      type: String,
      required: true,
    },
  },
  emits: ['titleChange'],
  setup(props, { emit }) {
    const dialogTableMemoryShow: any = ref(false);
    const titleListClone: any =  ref([]);
    const savedTitleList = _localStorage.get(props.tableTitle);
    
    /**
     * 此方法用于表格列配置
     * 若前端项目更新了表格列配置的对应表格，如对表格增加、减少、修改了若干列，则需要对本地存储的内容进行对应兼容
     *
     * @param {array} savedTitleList
     * @param {array} localTitleList
     * @return {array} compatibleTitleList
     */
    const tableMemoryCompatible = (savedTitleList: any, localTitleList: any) => {
      return localTitleList.map((itemLocal: any) => {
        const itemLocalClone = _.cloneDeep(itemLocal);
        const foundItem = savedTitleList.find((itemSaved: any) => itemLocalClone.title === itemSaved.title);
        if (foundItem) {
          itemLocalClone.status = foundItem.status;
        }
        return itemLocalClone;
      });
    }
    if (savedTitleList) {
      const compatibleTitleList = tableMemoryCompatible(savedTitleList, props.titleList);
      _localStorage.set(props.tableTitle, compatibleTitleList);
      emit('titleChange', compatibleTitleList);
    }
    titleListClone.value = props.titleList;

    const show = () => {
      dialogTableMemoryShow.value = true;
    }

    const closeDialogTableMemory = (titleListClone: any) => {
      dialogTableMemoryShow.value = false;
      if (titleListClone) {
        _localStorage.set(props.tableTitle, titleListClone);
        emit('titleChange', titleListClone);
      }
    }

    return {
      dialogTableMemoryShow,
      titleListClone,
      show,
      closeDialogTableMemory,
    };
  }
});
</script>>
