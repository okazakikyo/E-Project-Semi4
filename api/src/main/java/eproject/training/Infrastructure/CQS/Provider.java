/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eproject.training.Infrastructure.CQS;

import org.springframework.context.ApplicationContext;

/**
 *
 * @author THAI
 */
public class Provider<C extends IRequestHandler<?,?>> {
    private final ApplicationContext applicationContext;
    private final Class<C> type;

    public Provider(ApplicationContext applicationContext, Class<C> type) {
        this.applicationContext = applicationContext;
        this.type = type;
    }
    public C get(){
        return applicationContext.getBean(type);
    }
}
