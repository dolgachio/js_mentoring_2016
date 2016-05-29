'use strict';

module.exports = new Vue({
            el: '#main-view',
            data: {
                visibleChartNumber: 0,
                chartsQty: 3
            },
            methods: {
                nextChart: function () {
                    const nextNumber = this.$get('visibleChartNumber') + 1;

                    if(nextNumber < this.$get('chartsQty')) {
                        this.$set('visibleChartNumber', nextNumber);
                    }
                },

                prevChart: function () {
                    const prevNumber = this.$get('visibleChartNumber') - 1;

                    if(prevNumber >= 0) {
                        this.$set('visibleChartNumber', prevNumber);
                    }
                },

                isVisible(number) {
                    return number === this.$get('visibleChartNumber');
                }
            }
});
