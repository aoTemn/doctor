import { Form, Input, Select, DatePicker, Empty } from 'ant-design-vue';

import 'ant-design-vue/lib/form/style';
import 'ant-design-vue/lib/input/style';
import 'ant-design-vue/lib/select/style';
import 'ant-design-vue/lib/date-picker/style';
import 'ant-design-vue/lib/button/style';
import 'ant-design-vue/lib/empty/style';

export default {
  install(app) {
    app.use(Form);
    app.use(Input);
    app.use(Select);
    app.use(DatePicker);
    app.use(Empty);
  },
};
