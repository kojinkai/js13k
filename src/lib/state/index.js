const stateProvider = function() {
  let attributes = this;
  return {
    setAttribute(newValues) {
      attributes = {...attributes, ...newValues};
    },
    getAttribute(name) {
      return attributes[name];
    },
    getAttributes() {
      return attributes;
    }
  }
};

const createState = state => stateProvider.call(state);

export default createState;