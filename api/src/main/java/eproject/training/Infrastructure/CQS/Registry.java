/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eproject.training.Infrastructure.CQS;

import java.util.HashMap;
import java.util.Map;
import org.springframework.context.ApplicationContext;
import org.springframework.core.GenericTypeResolver;

/**
 *
 * @author THAI
 */
public class Registry {
    private Map<Class<? extends IRequest>, Provider> providerMap = new HashMap<>();
    public Registry (ApplicationContext applicationContext){
        String[] names = applicationContext.getBeanNamesForType(IRequestHandler.class);
        for(String name : names){
            register(applicationContext, name);
        }
    }
    
    private void register(ApplicationContext applicationContext, String name){
        Class<IRequestHandler<?,?>> handlerClass = (Class<IRequestHandler<?,?>>)applicationContext.getType(name);
        Class<?>[] generics = GenericTypeResolver.resolveTypeArguments(handlerClass, IRequestHandler.class);
        Class<? extends IRequest> requestType = (Class<? extends IRequest >)generics[1];
        providerMap.put(requestType, new Provider(applicationContext, handlerClass));
    }
    
    @SuppressWarnings("unchecked")
    <C extends IRequest<R>,R> IRequestHandler<C,R> get(Class<C> commandClass){
        return providerMap.get(commandClass).get();
    }
}
